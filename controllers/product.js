// const product = require("../models/product");
// const getAllProducts = async (req, res) => {
//     const { page = 1, limit = 12 , query} = req.query;
//     const category = req.query.category;
//     const _id = req.query._id;
//     // console.log(category);
//     console.log(_id);

//     console.log(req.query)
//     const searchQuery = { $or :[
//         {name : {$regex : query || '', $options: "i"}},
//         {description : {$regex : query || '', $options: "i"}},
//        // {category : {$regex : query || '' , $options: "i"}},
    
//     ]
//     }

//      if (category) {
//     searchQuery.category = category;
//   }
//     if (_id) {
//     searchQuery._id = _id;
//   }

//     try {
//         const myData = await product.find(searchQuery) 
//         .limit(limit * 1)
//         .skip((page - 1) * limit)
//         // .exec();
        
//         const count = await product.count(searchQuery);
//         const n_pages = await count / limit;
//       return res.status(200).json({myData, count, n_pages});
//     } catch (error) {
//         console.log(error)
//     }
// }


// module.exports = {getAllProducts};


const product = require("../models/product");

const getAllProducts = async (req, res) => {
  const { page = 1, limit = 12, query, _id } = req.query; // Fixed here
  const category = req.query.category;
  

  const searchQuery = {
    $or: [
      { name: { $regex: query || '', $options: "i" } },
      { description: { $regex: query || '', $options: "i" } },
    ],
  };

  if (category) {
    searchQuery.category = category;
  }
  if (_id) {
    searchQuery._id = _id;
  }

  try {
    const myData = await product
      .find(searchQuery)
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const count = await product.count(searchQuery);
    const n_pages = Math.ceil(count / limit); 

    return res.status(200).json({ myData, count, n_pages });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'An error occurred while fetching the products.' }); 
  }
};

module.exports = { getAllProducts };
