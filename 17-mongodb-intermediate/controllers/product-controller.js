const Product = require("../models/Product");

const getProductStats = async(req, res) =>{
    try {
        const result = await Product.aggregate([
            //stage 1 match product
           {
            $match: {
                inStock: true,
                price: {
                    // greater($gte) than 100
                    $gte: 100
                }
            }
           },
           // stage 2: group document
           {
            $group: {
              _id: "$category",
              avgPrice: {
                $avg: "$price",
              },
              count: {
                $sum: 1,
              },
            }
           }
        ])

        res.status(200).json({
            sucess: true,
            data: result
        })
    }catch (e) {
        console.log(e)
        res.status(500).json({
            sucess: false,
            message: "some error occured"
        })
    }
}

const getProductAnalysis = async(req, res)=>{
  try {
    const result = await Product.aggregate([
      //match category
        {
          $match:{
            category: "Electronics",
          }
        },
        //group category
        {
          $group: {
            _id: null,
            totalRevenue : {
              $sum: "$price",
            },
            averagePrice: {
              $avg: "$price",
            },
            maxProductPrice: {
              $max: "$price",
            },
            minProductPrice: {
              $min: "$price",
            },
          },
        },
        // project operator, which field u want to include and exclude to include(1), to exclude(0)
        {
          $project: {
            _id: 0,
            totalRevenue: 1,
            averagePrice: 1,
            maxProductPrice: 1,
            minProductPrice: 1,
            priceRange: {
              $subtract: ["$maxProductPrice", "$minProductPrice"],
            },
          }
        }
    ])
    res.status(200).json({
      sucess: true,
      data: result
    })
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
}

const insertSampleProducts = async(req, res) =>{
    try {
        const sampleProducts = [
            {
              name: "Laptop",
              category: "Electronics",
              price: 999,
              inStock: true,
              tags: ["computer", "tech"],
            },
            {
              name: "Smartphone",
              category: "Electronics",
              price: 699,
              inStock: true,
              tags: ["mobile", "tech"],
            },
            {
              name: "Headphones",
              category: "Electronics",
              price: 199,
              inStock: false,
              tags: ["audio", "tech"],
            },
            {
              name: "Running Shoes",
              category: "Sports",
              price: 89,
              inStock: true,
              tags: ["footwear", "running"],
            },
            {
              name: "Novel",
              category: "Books",
              price: 15,
              inStock: true,
              tags: ["fiction", "bestseller"],
            },
          ];
        //   insert the data into the database
        const result  = Product.insertMany(sampleProducts)
        res.status(201).json({
            succes: true,
            data: `Inserted ${result.length} sample products`,
          });
    } catch (e) {
        console.log(e)
        res.status(500).json({
            sucess: false,
            message: "some error occured"
        })
    }
}

module.exports = {
    insertSampleProducts,
    getProductStats,
    getProductAnalysis
};