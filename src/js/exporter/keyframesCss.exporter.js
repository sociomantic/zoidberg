import groupBy from 'lodash/groupBy';
import padStart from 'lodash/padStart';
import map from 'lodash/map';
import exporterMiddleware from 'exporter/exporterMiddleware';
import { sortMarkers, buildProperty } from 'helper/exporter.helper';


/**
* Exports the state of keyframe factories to CSS.
*
* @param {Object}            states                 states of factories to export
* @param {Object}            format                 format settings
*
* @return {Array}                                   CSS
*/
const exportKeyframesCss = ( states, format ) =>
{

    /**
    * Builds an @keyframe css rule.
    *
    * @param {String}         name                   name of keyframe
    * @param {Object}         groupedStates          factory states grouped by name
    *
    * @return {String}                               keyframe
    */
    const buildKeyframe = ( name, groupedStates ) =>
    {
        let atRule = `\n@keyframes ${ name } {`;

        sortMarkers( groupedStates ).forEach( state =>
        {
            atRule += buildMarkerBlock( state );
        } );

        return atRule += `\n}`;
    };


    /**
    * Builds a marker block statement with properties, if any.
    *
    * @param {Object}      state                     state of factory
    *
    * @return {String}                               marker block
    */
    const buildMarkerBlock = state =>
    {
        const { markers, props } = state;
        const leftIndent = padStart( '', format.outerIndent );

        let property = `\n${ leftIndent }${ markers.join( ', ' ) } {`;

        for( let prop in props )
        {
            let builtProperty = buildProperty( prop, props[prop], format );

            if( builtProperty ) property += builtProperty;
        }

        return property += `\n${ leftIndent }}`;
    };


    return map( groupBy( states, 'name' ), ( groups, name ) => buildKeyframe( name, groups ) );
};

export default ( options, state, keyframes ) => exporterMiddleware( options, state, keyframes, exportKeyframesCss );