## Pineapple CARD

Essa aplicação consiste em um sistema para visualização de faturas e pagamentos de um cartão. Este projeto faz parte do processo seletivo da FreteBras

Este projeto foi desenvolvido utilizando o framework Laravel para o backend e React.js para o front. O projeto possui migrations que podem ser executadas para criação do banco, e seeds para populá-lo. O arquivo .sql está dentro da pasta db, caso deseja fazer o restore manualmente. A API consiste em básicamente 3 rotas: uma para autenticação, uma para buscar as faturas, e outra para buscar os pagamentos desta fatura. Todos estes endpoints foram cobertos por testes. O projeto pode ser executado utilizando docker.

## Excutando o projeto

<ol>
    <li>É necessário ter o docker e docker-compose instalado.</li>
    <li>Copie o arquivo .env.example existente no projeto e cole com o nome de .env.</li>
    <li>Execute o seguinte comando na pasta raiz do projeto: docker-compose -f "docker-compose.yml" up -d --build </li>
    <li>Execute: docker ps. Pegue o ID do Container e entre dentro do mesmo com o seguinte comando:  docker exec -it ID bash</li>
    <li>Troque as credencias do banco para:
        <ul>
        <li>DB_CONNECTION=mysql</li>
        <li>DB_HOST=pineapple-mysql</li>
        <li>DB_PORT=3306</li>
        <li>DB_DATABASE=pineapple</li>
        <li>DB_USERNAME=root</li>
        <li>DB_PASSWORD=root</li>
        </ul>
    <p>Dentro do container:</p> 
    <li>Rode: composer install </li>
    <li>Ao subir o container, as migrations já são executadas, mas caso sinta necessidade de executar manualmente, execute: php artisan migrate</li>
    <li>Faça o seed do banco: php artisan db:seed</li>
    <li>Rode: npm install && npm run dev</li>
    <li>Acesse http://localhost.</li>
    <li>Caso queira, rode php artisan test para executar os testes.</li>
    
</ol>
