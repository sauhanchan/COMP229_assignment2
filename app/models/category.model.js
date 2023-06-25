//--------------

module.exports = (mongoose) => {

    var schema = mongoose.Schema({
        name: String,
    });

    //#To fix the problem with _id & id
    //#add an instance method to documents constructed from the schema
    schema.method("toJSON", function() {   

        const { __v, _id, ...object } = this.toObject();
        //#Add an id field
        object.id = _id;

        return object;
    });

    const Categories = mongoose.model("categories", schema);
    return Categories;
};