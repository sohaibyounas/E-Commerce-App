class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  // 1. Search by keyword across name OR description
  search() {
    if (this.queryString.search) {
      const keyword = {
        $or: [
          { name: { $regex: this.queryString.search, $options: "i" } },
          { description: { $regex: this.queryString.search, $options: "i" } },
        ],
      };
      this.query = this.query.find(keyword);
    }
    return this;
  }

  // 2. Advanced Filtering (Direct field handling + regex operators)
  filter() {
    const queryObj = { ...this.queryString };
    const excludedFields = ["page", "sort", "limit", "fields", "search"];
    excludedFields.forEach((el) => delete queryObj[el]);

    const mongoFilter = {};

    // 1. Direct price range handle karein (flat ya nested dono cases support)
    const minPrice =
      queryObj.minPrice ||
      (queryObj.price && queryObj.price.gte) ||
      queryObj["price[gte]"];
    const maxPrice =
      queryObj.maxPrice ||
      (queryObj.price && queryObj.price.lte) ||
      queryObj["price[lte]"];

    if (minPrice || maxPrice) {
      mongoFilter.price = {};
      if (minPrice) mongoFilter.price.$gte = Number(minPrice);
      if (maxPrice) mongoFilter.price.$lte = Number(maxPrice);
    }

    // 2. Category filter support
    if (queryObj.category) {
      mongoFilter.category = queryObj.category;
    }

    // 3. Any other exact field matches (e.g. isActive)
    if (queryObj.isActive !== undefined) {
      mongoFilter.isActive = queryObj.isActive === "true";
    }

    this.query = this.query.find(mongoFilter);
    return this;
  }

  // 3. Sorting
  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-createdAt");
    }
    return this;
  }

  // 4. Pagination
  paginate() {
    const page = parseInt(this.queryString.page, 10) || 1;
    const limit = parseInt(this.queryString.limit, 10) || 10;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

module.exports = APIFeatures;
