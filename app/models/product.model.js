//--------------

module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        name: String,
        description: String,
        price: Number,       
        published:Boolean,
        category: String
      },
    );
  
    //#To fix the problem with _id & id
    //#add an instance method to documents constructed from the schema
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      //#Add an id field
      object.id = _id;
      return object;
    });
  
    const  Products = mongoose.model("products", schema);
    return Products;
  };