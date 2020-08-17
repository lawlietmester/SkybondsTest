import fractions from './library';


test( 'task example', () => {
	expect( fractions( [
		'1.5',
		'3',
		'6',
		'1.5'
	] ) ).toEqual( [
		'12.500',
		'25.000',
		'50.000',
		'12.500'
	] );
});

test( 'incorrect input: not an array', () => {
	expect(
		() => { fractions( 5 ); }
	).toThrow();
});

test( 'incorrect input: empty array', () => {
	expect(
		() => { fractions( [] ); }
	).toThrow();
});

test( 'incorrect input: arry of not numeric strings', () => {
	expect(
		() => { fractions( [ 'zuzu' ] ); }
	).toThrow();
});

test( 'array with one element', () => {
	let output = fractions( [ '6.333' ] );
	
	expect(
		output
	).toEqual( [ '100.000' ] );
});

test( 'big input array length', () => {
	let output = fractions(
		Array(1000).fill( 0 ).map( () => String( Math.random() ) ) 
	);
	
	expect(
		Math.round( output.reduce( ( carry, value ) => carry + Number( value ), 0 ) )
	).toBe( 100 );
});

