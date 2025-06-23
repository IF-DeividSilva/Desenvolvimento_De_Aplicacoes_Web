import sqlite3

def adicionar_coluna_nickname():
    try:
        conn = sqlite3.connect('test.db')  # Ajuste o nome do seu banco de dados
        cursor = conn.cursor()
        
        # Verificar se a coluna já existe
        cursor.execute("PRAGMA table_info(user_profiles)")
        colunas = cursor.fetchall()
        coluna_existe = any(coluna[1] == 'nickname' for coluna in colunas)
        
        if not coluna_existe:
            # Adicionar coluna nickname com valor padrão temporário
            cursor.execute("ALTER TABLE user_profiles ADD COLUMN nickname TEXT DEFAULT 'user'")
            print("Coluna 'nickname' adicionada com sucesso à tabela 'user_profiles'")
        else:
            print("A coluna 'nickname' já existe na tabela 'user_profiles'")
        
        conn.commit()
        conn.close()
        return True
    except Exception as e:
        print(f"Erro ao adicionar coluna: {str(e)}")
        return False

if __name__ == "__main__":
    adicionar_coluna_nickname()