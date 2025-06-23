import sqlite3

def add_tipo_column():
    try:
        conn = sqlite3.connect('test.db')
        cursor = conn.cursor()
        
        # Verificar se a coluna já existe
        cursor.execute("PRAGMA table_info(avaliacoes)")
        colunas = cursor.fetchall()
        coluna_tipo_existe = any(col[1] == 'tipo' for col in colunas)
        
        if not coluna_tipo_existe:
            # Adicionar a coluna tipo
            cursor.execute("ALTER TABLE avaliacoes ADD COLUMN tipo TEXT DEFAULT 'exercicio';")
            print("Coluna 'tipo' adicionada com sucesso!")
            
            # Atualizar registros existentes
            cursor.execute("UPDATE avaliacoes SET tipo = 'exercicio';")
            print("Registros existentes atualizados com tipo='exercicio'")
        else:
            print("Coluna 'tipo' já existe!")
        
        conn.commit()
        conn.close()
        
        print("Operação concluída com sucesso!")
        return True
    except Exception as e:
        print(f"Erro ao adicionar coluna: {str(e)}")
        return False

if __name__ == "__main__":
    add_tipo_column()