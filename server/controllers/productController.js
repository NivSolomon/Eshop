import Product from "../models/Product.js";

const getAllProducts = async (req, res) => {
  const products = await Product.find();
  res.send(products);
};

const getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: "Product was not found" });
  }
};

const getProductByToken = async (req, res) => {
  const { token } = req.params;
  const product = await Product.findOne({ token: token });
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: "Product was not found" });
  }
};
const getCategories = async (req, res) => {
  const categories = await Product.find().distinct("category");
  res.send(categories);
};

const getProductsByQuery = async (req, res) => {
  const { query } = req;
  const page = query.page || 1;
  const order = query.order || "";
  const category = query.category || "";
  const price = query.price || "";
  const rating = query.rating || "";
  const searchQuery = query.query || "";
  const pageSize = query.pageSize || 6;

  const queryFilter =
    searchQuery && searchQuery !== "all"
      ? {
          title: {
            $regex: searchQuery,
            $options: "i",
          },
        }
      : {};
  const categoryFilter =
    category && category !== "all"
      ? {
          category,
        }
      : {};
  const priceFilter =
    price && price !== "all"
      ? {
          price: {
            $gte: Number(price.split("-")[0]),
            $lte: Number(price.split("-")[1]),
          },
        }
      : {};
  const ratingFilter =
    rating && rating !== "all"
      ? {
          "rating.rate": {
            $gte: Number(rating),
          },
        }
      : {};
  const sortOrderFilter =
    order === "lowest"
      ? { price: 1 }
      : order === "highest"
      ? { price: -1 }
      : order === "toprated"
      ? { rating: -1 }
      : order === "newest"
      ? { createdAt: -1 }
      : { _id: -1 };

  const products = await Product.find({
    ...queryFilter,
    ...categoryFilter,
    ...priceFilter,
    ...ratingFilter,
  })
    .sort(sortOrderFilter)
    .skip((page - 1) * pageSize)
    .limit(pageSize);

  const countProducts = await Product.countDocuments({
    ...queryFilter,
    ...categoryFilter,
    ...priceFilter,
    ...ratingFilter,
  });

  res.send({
    products,
    countProducts,
    page,
    pages: Math.ceil(countProducts / pageSize),
  });
};

export {
  getAllProducts,
  getProductById,
  getProductByToken,
  getCategories,
  getProductsByQuery,
};
