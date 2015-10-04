// Counting tests
describe('Reductio downsample', function () {
    var group, groupString, reducer, reducerString;

    beforeEach(function () {
        var data = crossfilter([
            { foo: 0, bar: 1 },
            { foo: 1000, bar: 2 },
            { foo: 2000, bar: 3 },
            { foo: 3000, bar: 4 },
            { foo: 4000, bar: 5 },
            { foo: 5000, bar: 6 },
        ]);

        var dim = data.dimension(function(d) { return d.foo; });
        group = dim.group();
        groupString = dim.group();

        reducer = reductio()
                .sum(function(d) { return d.bar; })
                .downsample(function(d){return d.sum;})
                .threshold(3)
                .count(true);

        reducerString = reductio()
                .sum('bar')
                .downsample('sum')
                .threshold(3)
                .count(true);

        reducer(group);
        reducerString(groupString);
    });

    it('has three groups', function () {
        expect(group.all().length).toEqual(3);
        expect(groupString.all().length).toEqual(3);
    });

    it('grouping have the right sums', function(){
        allString = groupString.all();
        all = group.all();
        expect(all[0].value.sum).toBe(1);
        expect(all[1].value.sum).toBe(2);
        expect(all[2].value.sum).toBe(6);
        expect(allString[0].value.sum).toBe(1);
        expect(allString[1].value.sum).toBe(2);
        expect(allString[2].value.sum).toBe(6);
    });

    it('returns all if threshold is larger than data length', function(){
        reducer.threshold(1000);
        reducerString.threshold(1000);
        expect(group.all().length).toBe(6);
        expect(groupString.all().length).toBe(6);
    });

    it('changes grouping when reducer threshold is changed', function(){
        reducer.threshold(2);
        expect(group.all().length).toBe(2);
        reducer.threshold(4);
        expect(group.all().length).toBe(4);
    });
});
