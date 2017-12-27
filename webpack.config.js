const path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack'); // potrzebny do UglifyJSPlugin

var UglifyJSPlugin = require('uglifyjs-webpack-plugin'); 
// UglifyJSPlugin zabezpiecza nasz kod przed osobami, które chciałby go skopiować i użyć w swoich projektach. 
//Pluginu nie trzeba pobierać - jest on częścią samego Webpacka. Dodatkowo mocno kompresujemy rozmiar paczki, np. nawet 4x.

var OptimizeJsPlugin = require('optimize-js-plugin');


module.exports = {

    entry: './src/index.js',

    output: {

        path: path.resolve('./', "build"),
        filename: 'App.bundle.js'
    },

    module: {

        rules: [

            {
                test: /\.js$/,
                loader: 'babel-loader'
            },

            {
                test: /\.css$/,
                use: [
                    
                    { loader: 'style-loader'},

                    {
                        loader: 'css-loader',
                        options: {

                            modules: true
                        }
                    }
                ]

                /*
                Parametr use to odpowiednik dla pojedynczego loader. Przyjmuje listę loaderów przez które musi przejść plik .css,
                 aby stać się modułem. Dzięki opcji module: true ustawionej na loaderze css-loader, Webpack nie tylko potrafi 
                 ładować pliki .css, ale także zmienia ich zasięg na lokalny (tzn. działa tylko w obrębie danego modułu,
                     w którym został zaimportowany). Dzięki temu nie musimy się martwić o to, że użyliśmy już jakiejś klasy.

                     2. Loader zmieni nazwę klasy className na module na ciag losowych znakow aby nazwy klas sie nie powtarzaly
                     w wynikowym pliku.
                */
            }
        ]
    },

    plugins: [
        
        new HtmlWebpackPlugin({

        template: 'src/index.html',
        filename: 'index.html',
        inject: 'body'

        }),

        new webpack.optimize.UglifyJsPlugin(), // W atrybucie optimize znajduje się zestaw pluginów optymalizacyjnych wbudowanych w Webpacka.

        new OptimizeJsPlugin({
            
            sourceMap: false //bierze każdą funkcję, która jest wywoływana natychmiastowo (ang. immediately invoked function expression, tzw. IIFE) oraz funkcje,
            // które prawdopodobnie zostaną wywołane podczas startu aplikacji i opakowuje je dodatkową parą nawiasów
            // zwieksza to wydajnosc aplikacji. Ten plugin nalezy instalowac w npm
        })
    ]
    // plugin HtmlWebpackPlugin wygeneruje nam nowy index.html z tagiem <script> wskazujacym zrodlo zbundlowanego JSa
    /*
    Do tablicy plugins dodajemy pierwszą instancję pliku konfiguracyjnego dla szablonów HTML. 
    Oznacza to, że możemy przy jego użyciu utworzyć kolejne instancje, czyli kolejne pliki .html. Nam jednak potrzebny
     jest tylko jeden plik - index.html.

    Dzięki pluginom (wtyczkom) Webpack umożliwia dorzucenie kolejnego kroku do swojego procesu kompilacji. 
    Plugin jest instalowany w momencie uruchomienia Webpacka i operuje zazwyczaj na gotowych paczkach (ang. bundle).
     Optymalizacja kodu, wyciąganie pewnych wspólnych fragmentów kodu to właśnie zasługa wtyczek. 
     Różnica między nimi a loaderami polega na tym, że loadery operują na poziomie pojedynczych plików zanim powstanie paczka, 
     natomiast pluginy działają, jak już wcześniej wspomniałem, na poziomie wygenerowanego fragmentu (ang. chunk).
    */
}