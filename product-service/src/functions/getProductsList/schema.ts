export const ParamsType = {
  type: "object",
  properties: {},
  required: []
};

export const ProductsListType = {
  type: "array",
  items: {
    type: "object",
    properties: {
      id: { type: 'string' },
      title: { type: 'string' },
      description: { type: 'string' },
      price: { type: 'number' },
      count: { type: 'number' },
      image: { type: 'string' },
    },
    required: ['id', 'title', 'description', 'price', 'count', 'image']
  }
};
