// Alias tests
describe('Alias function', function () {
    var group;
    var values = {};

    beforeEach(function () {
        var data = crossfilter([
            { foo: 'one' },
            { foo: 'two' },
            { foo: 'three' },
            { foo: 'one' },
            { foo: 'one' },
            { foo: 'two' },
        ]);

        var dim = data.dimension(function(d) { return d.foo; });
        group = dim.group();

        var reducer = reductio()
                .count(true)
                .alias({ newCount: function(g) { return g.count; },
                         theCount: function(g) { return g.count+' items... AH AH AH'; }
                      });

        reducer(group);


        group.top(Infinity).forEach(function (d) {
            values[d.key] = d.value;
        });
    });

    it('has three groups', function () {
        expect(group.top(Infinity).length).toEqual(3);
    });

    it('grouping for first alias have the right counts', function () {

        expect(values['one'].newCount()).toEqual(3);
        expect(values['two'].newCount()).toEqual(2);
        expect(values['three'].newCount()).toEqual(1);
    });

    it('groupings for second alias have the right values', function(){

        expect(values['one'].theCount()).toMatch('3 items... AH AH AH');
        expect(values['two'].theCount()).toMatch('2 items... AH AH AH');
        expect(values['three'].theCount()).toMatch('1 items... AH AH AH');
    });
});