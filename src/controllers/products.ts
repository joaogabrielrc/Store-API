import { Request, Response } from "express";
import Product from "../models/Product";


interface IQueryName {
  $regex: string,
  $options: string
}

interface ProductQueryType {
  [key: string]: unknown
  featured?: boolean
  name?: IQueryName
  company?: string
  price?: object
  ranting?: object
}

const getAllProducts = async (request: Request, response: Response) => {
  const queryObject: ProductQueryType = {};  
  const {
    featured,
    name,
    company,
    sort,
    fields,
    numericFilters
  } = request.query;

  if (featured)
    queryObject.featured = featured === "true" ? true : false;
  if (name)
    queryObject.name = { $regex: name.toString(), $options: "i" };
  if (company)
    queryObject.company = company.toString();  
  
  if (numericFilters) {
    type OperatorMapType = {
      [key: string]: string
    }

    const operatorMap: OperatorMapType = {
      ">": "$gt",
      ">=": "$gte",
      "=": "$eq",
      "<": "$lt",
      "<=": "$lte"
    };

    const regEx = /\b(>|>=|=|<|<=)\b/g;
    const filters = numericFilters.toString().replace(
      regEx,
      match => `-${operatorMap[match]}-`
    );

    const options = ["price", "rating"];
    filters.split(",").forEach(item => {
      const [field, operator, value] = item.split("-");
      if (options.includes(field)) {
        queryObject[field] = { [operator]: Number(value) };
      }
    });
  }  
  
  let queryset = Product.find(queryObject);

  if (sort) {
    const filters = sort.toString().replace(",", " ");
    queryset = queryset.sort(filters);
  } else {
    const filters = "createdAt";
    queryset = queryset.sort(filters);
  }

  if (fields) {
    const filters = fields.toString().replace(",", " ");
    queryset = queryset.select(filters);
  }  
   
  const page = Number(request.query.page) || 1;
  const limit = Number(request.query.limit) || 10;
  const skip = (page - 1) * limit;

  queryset = queryset.skip(skip).limit(limit);

  const products = await queryset;
  return response.status(200).json({
    results: products.length,
    products
  });
};

export {
  getAllProducts    
};