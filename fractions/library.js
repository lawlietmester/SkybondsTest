// @flow
/** @function */
export default ( initialArray/*: string[]*/ )/*: string[]*/ => {
	if( !Array.isArray( initialArray ) ) throw new Error( '"initialArray" is not an array' );
	if( !initialArray.length ) throw new Error( '"initialArray" is empty' );
	if( initialArray.some( item => typeof item !== 'string' ) ){
		throw new Error( '"initialArray" has several not string values' );
	}
	if( initialArray.length > 2300000 ) throw new Error( '"initialArray" has too big array length' );
	
	let numbers/*: number[]*/ = initialArray.map( item => Number( item ) );
	if( numbers.some( item => isNaN( item ) ) ){
		throw new Error( '"initialArray" has some not numeric values' );
	}
		
	let summ = numbers.reduce( ( carry, item ) => carry + item, 0 );
	
	return numbers.map( item => ( Math.round( 100000 * item / summ ) / 1000 ).toFixed( 3 ) );
};






