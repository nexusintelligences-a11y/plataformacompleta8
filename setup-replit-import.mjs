#!/usr/bin/env node

/**
 * SCRIPT DE SETUP AUTOMÁTICO PARA IMPORTAÇÃO REPLIT
 * 
 * Este script é executado automaticamente quando você importa o projeto para o Replit.
 * Ele configura as 3 tabelas workspace no Supabase e recarrega o schema cache.
 */

import pg from 'pg';
const { Client } = pg;

console.log('🚀 SETUP AUTOMÁTICO REPLIT → SUPABASE');
console.log('=====================================\n');

async function setupWorkspaceTables() {
  // 1. Verificar se as credenciais do Supabase estão configuradas
  console.log('📋 Passo 1/4: Verificando credenciais...');
  
  if (!process.env.DATABASE_URL) {
    console.log('❌ DATABASE_URL não configurado!');
    console.log('\n⚠️  AÇÃO NECESSÁRIA:');
    console.log('1. Crie um PostgreSQL database via Replit');
    console.log('2. Execute este script novamente: node setup-replit-import.mjs\n');
    process.exit(1);
  }
  
  if (!process.env.REACT_APP_SUPABASE_URL || !process.env.REACT_APP_SUPABASE_ANON_KEY) {
    console.log('ℹ️  Supabase não configurado - workspace usará localStorage');
    console.log('   Configure via interface web em /configuracoes para usar Supabase\n');
  }
  
  console.log('✅ Credenciais verificadas\n');
  
  // 2. Conectar ao banco de dados
  console.log('📋 Passo 2/4: Conectando ao PostgreSQL...');
  const client = new Client({
    connectionString: process.env.DATABASE_URL
  });
  
  try {
    await client.connect();
    console.log('✅ Conectado ao PostgreSQL\n');
    
    // 3. Verificar se as tabelas já existem
    console.log('📋 Passo 3/4: Verificando tabelas workspace...');
    const checkResult = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name LIKE 'workspace%'
      ORDER BY table_name
    `);
    
    if (checkResult.rows.length === 3) {
      console.log('✅ As 3 tabelas workspace já existem:');
      checkResult.rows.forEach(row => console.log('   ✅', row.table_name));
      
      // Recarregar schema cache mesmo que as tabelas existam
      console.log('\n📋 Passo 4/4: Recarregando schema cache do PostgREST...');
      await client.query("NOTIFY pgrst, 'reload schema'");
      console.log('✅ Schema cache recarregado\n');
      
      console.log('🎉 SETUP COMPLETO!');
      console.log('✅ Workspace pronto para uso\n');
      await client.end();
      return;
    }
    
    console.log(`⚠️  Apenas ${checkResult.rows.length} tabela(s) encontrada(s)`);
    console.log('🔧 Criando tabelas faltantes...\n');
    
    // 4. Criar as tabelas workspace
    console.log('📦 Criando workspace_pages...');
    await client.query(`
      CREATE TABLE IF NOT EXISTS public.workspace_pages (
        id TEXT PRIMARY KEY,
        tenant_id TEXT NOT NULL,
        client_id TEXT NOT NULL,
        title TEXT NOT NULL,
        content TEXT,
        icon TEXT,
        parent_id TEXT,
        type TEXT NOT NULL DEFAULT 'page',
        cover TEXT,
        font_style TEXT,
        favorited BOOLEAN DEFAULT false,
        locked BOOLEAN DEFAULT false,
        full_width BOOLEAN DEFAULT false,
        small_text BOOLEAN DEFAULT false,
        databases JSONB DEFAULT '[]'::jsonb,
        blocks JSONB DEFAULT '[]'::jsonb,
        properties JSONB DEFAULT '{}'::jsonb,
        created_at BIGINT NOT NULL DEFAULT (EXTRACT(epoch FROM now()) * 1000),
        updated_at BIGINT NOT NULL DEFAULT (EXTRACT(epoch FROM now()) * 1000)
      )
    `);
    console.log('✅ workspace_pages criada');
    
    console.log('📦 Criando workspace_databases...');
    await client.query(`
      CREATE TABLE IF NOT EXISTS public.workspace_databases (
        id TEXT PRIMARY KEY,
        tenant_id TEXT NOT NULL,
        client_id TEXT NOT NULL,
        title TEXT NOT NULL,
        description TEXT,
        icon TEXT,
        cover TEXT,
        view_type TEXT NOT NULL,
        page_id TEXT,
        current_view_id TEXT,
        chart_type TEXT,
        chart_x_axis TEXT,
        chart_y_axis TEXT,
        favorited BOOLEAN DEFAULT false,
        locked BOOLEAN DEFAULT false,
        columns JSONB NOT NULL DEFAULT '[]'::jsonb,
        rows JSONB NOT NULL DEFAULT '[]'::jsonb,
        views JSONB NOT NULL DEFAULT '[]'::jsonb,
        created_at BIGINT NOT NULL DEFAULT (EXTRACT(epoch FROM now()) * 1000),
        updated_at BIGINT NOT NULL DEFAULT (EXTRACT(epoch FROM now()) * 1000)
      )
    `);
    console.log('✅ workspace_databases criada');
    
    console.log('📦 Criando workspace_boards...');
    await client.query(`
      CREATE TABLE IF NOT EXISTS public.workspace_boards (
        id TEXT PRIMARY KEY,
        tenant_id TEXT NOT NULL,
        client_id TEXT NOT NULL,
        title TEXT NOT NULL,
        icon TEXT DEFAULT '📋',
        color TEXT,
        cover TEXT,
        favorited BOOLEAN DEFAULT false,
        lists JSONB NOT NULL DEFAULT '[]'::jsonb,
        cards JSONB NOT NULL DEFAULT '[]'::jsonb,
        labels JSONB NOT NULL DEFAULT '[]'::jsonb,
        members JSONB NOT NULL DEFAULT '[]'::jsonb,
        settings JSONB NOT NULL DEFAULT '{}'::jsonb,
        created_at BIGINT NOT NULL DEFAULT (EXTRACT(epoch FROM now()) * 1000),
        updated_at BIGINT NOT NULL DEFAULT (EXTRACT(epoch FROM now()) * 1000)
      )
    `);
    console.log('✅ workspace_boards criada\n');
    
    // 5. Configurar RLS e políticas
    console.log('🔒 Configurando RLS e políticas...');
    await client.query(`
      ALTER TABLE public.workspace_pages ENABLE ROW LEVEL SECURITY;
      ALTER TABLE public.workspace_databases ENABLE ROW LEVEL SECURITY;
      ALTER TABLE public.workspace_boards ENABLE ROW LEVEL SECURITY;
    `);
    
    // Políticas públicas temporárias (melhorar com autenticação depois)
    const tables = ['workspace_pages', 'workspace_databases', 'workspace_boards'];
    for (const table of tables) {
      try {
        await client.query(`DROP POLICY IF EXISTS "Public can view ${table}" ON public.${table}`);
        await client.query(`DROP POLICY IF EXISTS "Public can create ${table}" ON public.${table}`);
        await client.query(`DROP POLICY IF EXISTS "Public can update ${table}" ON public.${table}`);
        await client.query(`DROP POLICY IF EXISTS "Public can delete ${table}" ON public.${table}`);
        
        await client.query(`CREATE POLICY "Public can view ${table}" ON public.${table} FOR SELECT USING (true)`);
        await client.query(`CREATE POLICY "Public can create ${table}" ON public.${table} FOR INSERT WITH CHECK (true)`);
        await client.query(`CREATE POLICY "Public can update ${table}" ON public.${table} FOR UPDATE USING (true)`);
        await client.query(`CREATE POLICY "Public can delete ${table}" ON public.${table} FOR DELETE USING (true)`);
      } catch (policyError) {
        console.log(`   ⚠️  Aviso ao criar políticas para ${table}: ${policyError.message}`);
      }
    }
    console.log('✅ RLS e políticas configuradas\n');
    
    // 6. Criar triggers para updated_at
    console.log('⚙️  Criando triggers...');
    for (const table of tables) {
      await client.query(`
        CREATE OR REPLACE FUNCTION public.update_${table}_updated_at()
        RETURNS TRIGGER AS $$
        BEGIN
          NEW.updated_at = EXTRACT(epoch FROM now()) * 1000;
          RETURN NEW;
        END;
        $$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;
        
        DROP TRIGGER IF EXISTS update_${table}_updated_at ON public.${table};
        
        CREATE TRIGGER update_${table}_updated_at
          BEFORE UPDATE ON public.${table}
          FOR EACH ROW
          EXECUTE FUNCTION public.update_${table}_updated_at();
      `);
    }
    console.log('✅ Triggers criados\n');
    
    // 7. CRÍTICO: Recarregar schema cache do PostgREST
    console.log('📋 Passo 4/4: Recarregando schema cache do PostgREST...');
    await client.query("NOTIFY pgrst, 'reload schema'");
    console.log('✅ Schema cache recarregado\n');
    
    // 8. Verificação final
    const finalCheck = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name LIKE 'workspace%'
      ORDER BY table_name
    `);
    
    console.log('🎉 SETUP COMPLETO!');
    console.log('\n✅ Tabelas workspace criadas e configuradas:');
    finalCheck.rows.forEach(row => console.log('   ✅', row.table_name));
    console.log('\n🚀 Próximos passos:');
    console.log('1. Reinicie o workflow "Dev Server"');
    console.log('2. Acesse a aba Workspace na aplicação');
    console.log('3. Crie páginas, databases e boards - tudo será salvo no Supabase!\n');
    
    await client.end();
    
  } catch (error) {
    console.error('\n❌ ERRO:', error.message);
    console.error('\n💡 Possíveis soluções:');
    console.error('1. Verifique se o DATABASE_URL está correto');
    console.error('2. Verifique se você tem permissões no Supabase');
    console.error('3. Leia SETUP_SUPABASE.md para mais detalhes\n');
    await client.end();
    process.exit(1);
  }
}

// Executar setup
setupWorkspaceTables().catch(error => {
  console.error('Erro fatal:', error);
  process.exit(1);
});
