const 
    path = require('path'),
    webpack = require('webpack'),
    CopyWebpackPlugin = require('copy-webpack-plugin'),
    MiniCssExtractPlugin = require('mini-css-extract-plugin');

    const toCamel = (s) => {
        return s.replace(/([-_][a-z])/ig, ($1) => {
          return $1.toUpperCase()
            .replace('-', '')
            .replace('_', '');
        });
      };

module.exports = {
    entry: {
        app: ['./Resources/Styles/app.sass', './Resources/Scripts/app.ts'],
        theme: ['./Resources/Themes/material-pro-lite-master/html/scss/colors/blue.scss'],
        profileAuthApp: './Resources/Scripts/pages/profile-auth-app.ts',
        profileDevice: './Resources/Scripts/pages/profile-device.ts',
        loginDeviceVerification: './Resources/Scripts/pages/login-device-verification.ts',
        userslist: './Resources/Scripts/pages/users-list.ts'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'wwwroot')
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    module: {
        rules: [
            //{
            //    test: /bootstrap\.native/,
            //    use: {
            //        loader: 'bootstrap.native-loader',
            //        options: {
            //            only: ['tab']
            //        }
            //    }
            //},
            { test: /dataTables\.net.*/, use: 'imports-loader?define=>false,$=jquery'},
            {
                test: /\.tsx?$/,
                use: [
                    'ts-loader'
                ]
            },
            {
                test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
               use: 'url-loader?limit=10000'
            },
            {
                test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
                 use: 'file-loader'
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            }, 
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 1
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css',
            ignoreOrder: false
        }),
        new CopyWebpackPlugin([
            './Resources/Images/favicon.ico',
            './Resources/Images/myci-logo-100.png',
            './Resources/Images/myci-logo-standalone-35.png',
            './Resources/Images/myci-logo-text-35.png'
        ]),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            'window.jQuery': 'jquery',
            DataTable: ['jquery.dataTables.js', 'default']
         })
    ]
};