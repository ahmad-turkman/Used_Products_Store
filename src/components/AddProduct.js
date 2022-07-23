import { useState } from 'react';

export const AddProduct = ({ categories, onAdd }) => {
  let options =
    categories.length > 0 &&
    categories.map((category) => {
      return (
        <option key={category.category_id} value={category.name}>
          {category.name}
        </option>
      );
    }, this);

  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [quality, setQuality] = useState('');
  const [price, setPrice] = useState('');
  const [details, setDetails] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    const user_name = 'ahmad';
    onAdd({ name, category, description, quality, price, details, user_name });

    setName('');
    setCategory(categories[0].name);
    setDescription('');
    setQuality('');
    setPrice('');
    setDetails('');
  };

  return (
    <div className="container">
      <form id="addForm" onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Product Name..."
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <select id="select" onChange={(e) => setCategory(e.target.value)}>
          {options}
        </select>
        <input
          type="text"
          placeholder="Description"
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="number"
          min="0"
          max="100"
          placeholder="quality"
          required
          value={quality}
          onChange={(e) => setQuality(e.target.value)}
        />
        <input
          type="text"
          placeholder="Price"
          required
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <textarea
          placeholder="Product Details..."
          value={details}
          onChange={(e) => setDetails(e.target.value)}
        ></textarea>
        <input type="submit" className="btn" value="Add Product" />
      </form>
    </div>
  );
};
