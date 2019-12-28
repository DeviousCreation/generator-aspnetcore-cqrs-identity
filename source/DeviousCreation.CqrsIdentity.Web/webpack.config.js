const  
        path = require('path'),
        webpack = require('webpack'),
        MiniCssExtractPlugin = require('mini-css-extract-plugin'),
        {CleanWebpackPlugin} = require('clean-webpack-plugin');
//var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');

module.exports = {
    entry: {
        app:  ['./Resources/Styles/app.sass', './Resources/Scripts/app.ts'],
        theme: ['./Resources/Styles/theme.sass'],
        vendor: ['./Resources/Styles/vendor.sass'],
        'profile-auth-app': './Resources/Scripts/pages/profile-auth-app.ts',
        'user-listing': './Resources/Scripts/pages/users-list.ts',
        'role-listing': './Resources/Scripts/pages/role-listing.ts',
        'role-creation': './Resources/Scripts/pages/role-creation.ts',
    },
    devtool: 'inline-source-map',
    output: {
        path: path.resolve(__dirname, 'wwwroot'),
        filename: '[name].js' // template based on keys in entry above (index.js & admin.js)
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    module: {
        rules: [
            { 
                test: /dataTables\.net.*/, 
                use: 'imports-loader?define=>false,$=jquery'
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader'
            },
            // {
            //     test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            //    use: 'url-loader?limit=10000'
            // },
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
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
            }]
    },
    optimization: {
        splitChunks: {
           // include all types of chunks
           cacheGroups: {
            vendors: {
                test: /[\\/]node_modules[\\/]/,
                name: 'vendors',
                chunks: 'all'
              },
            commons: {
                name: 'commons',
                test: /[\\/]Scripts[\\/](helpers|services)[\\/]/,
                chunks: 'all'
              },
              
          }
        }
      },
      plugins: [
        new CleanWebpackPlugin() ,
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css',
            ignoreOrder: false
        }),
        
           new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            'window.jQuery': 'jquery',
            'window.$': 'jquery',
             //DataTable: 'datatables.net'
          })
      ]
 };