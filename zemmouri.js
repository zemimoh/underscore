_.mixin({
    groupByMulti: function (obj, values, context) {
        if (!values.length)
            return obj;
        var byFirst = _.groupBy(obj, values[0], context),
            rest = values.slice(1);
        for (var prop in byFirst) {
            byFirst[prop] = _.groupByMulti(byFirst[prop], rest, context);
        }
        return byFirst;
    },

    // Return the sum of elements (or elements-based computation).
    sum: function (obj, iteratee, context) {
        var result = 0, value, computed;
        if (iteratee == null && obj != null) {
            obj = $(obj).isArrayLike ? obj : _.values(obj);
            for (var i = 0, length = obj.length; i < length; i++) {
                value = obj[i];
                result += value;
            }
        } else {
            iteratee = _.cb(iteratee, context);
            _.each(obj, function (value, index, list) {
                computed = iteratee(value, index, list);
                result += computed;
            });
        }
        return result;
    },

    // Return the avg of elements (or elements-based computation).
    avg: function (obj, iteratee, context) {
        var result = 0;
        var size = _.size(obj);
        if(size)
        {
            var sum = _.sum(obj, iteratee, context);
            result = sum / size;
        }       
        return result;
    },

    aggregate: function (obj, values, context) {
        if (!values.length)
            return obj;
        var byFirst = _.groupBy(obj, values[0], context),
            rest = values.slice(1);
        for (var prop in byFirst) {
            byFirst[prop] = _.groupByMulti(byFirst[prop], rest, context);
        }
        return byFirst;
    }
});



function aggregate(data, field, aggregation, lastValue) {
    {	//vars initialisation	
        if (!field) aggregation = "count";
        if (Aggregate_Functions.indexOf(aggregation) == -1) aggregation = "count";
        lastValue = lastValue ? lastValue : 0;
    }
    var result = null;
    if (data) {
        if (aggregation == "count") {
            result = data.length;
        }
        else {
            var values = _.pluck(data, field);

            for (i = 0; i < values.length; i++) {
                values[i] = parseFloat(values[i]);
            }
            if (aggregation == "max") {
                result = _.max(values);
            }
            else if (aggregation == "min") {
                result = _.min(values);
            }
            else if (aggregation == "sum") {
                result = _.reduce(values, function (memo, num) { return memo + num; }, 0);
            }
            else if (aggregation == "avg") {
                result = _.reduce(values, function (memo, num) { return memo + num; }, 0) / _.size(values);
            }
            else if (aggregation == "cum") {
                result = lastValue + _.reduce(values, function (memo, num) { return memo + num; }, 0);
            }
        }
    }
    return result;
}


