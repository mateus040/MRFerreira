<!DOCTYPE html>
<html lang="pt-BR">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contato do Formulário</title>
    <style>
        body {
            font-family: "Poppins", sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
        }

        h1 {
            color: #333333;
            font-size: 24px;
            margin-bottom: 10px;
        }

        p {
            color: #555555;
            font-size: 16px;
            line-height: 1.5;
            margin-bottom: 0;
            margin-top: 5px;
        }

        .container {
            max-width: 850px;
            margin-left: auto;
            margin-right: auto;
            background: #fff;
        }

        .header {
            width: 100%;
            background: black;
            padding-top: 12px;
            padding-bottom: 12px;
        }

        .content {
            padding: 20px;
            padding-bottom: 20px;
            padding-left: 30px;
            padding-right: 30px;
        }

        .footer {
            margin-top: 36px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
    </style>
</head>

<body>
    <div class="container">
        <div class="header">
            <h1 style="text-align: center; color: #fff;">Contato de {{ $nome }}</h1>
        </div>

        <div class="content">
            <p style="font-size: 18px;">
                <strong>Email do usuário:</strong> {{ $email }}
            </p>
            <p style="margin-top: 26px;"><strong>Mensagem:</strong> {{ $descricao }}</p>

            <div class="footer">
                <p style="font-weight: 600; text-align: center;">MRFerreira Representações</p>
            </div>
        </div>
    </div>
</body>

</html>
