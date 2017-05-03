const path    = require( 'path' );
const resolve = relative => path.join( __dirname, relative );

module.exports =
{
    devtool : 'source-map',
    entry   : resolve( '/src/js/index.js' ),
    output  :
    {
        path          : resolve( '/dist' ),
        filename      : 'zoidberg.js',
        library       : 'zoidberg',
        libraryTarget : 'umd'
    },
    resolve :
    {
        modules :
        [
            resolve( 'src/js' )
        ]
    },
    module :
    {
        loaders : [ {
            test   : /.js$/,
            loader : 'babel-loader',
            exclude :
            [
                resolve( '/node_modules' )
            ],
            query  :
            {
                presets : ['es2015'],
                plugins : ['transform-object-rest-spread']
            }
        } ]
    }
};