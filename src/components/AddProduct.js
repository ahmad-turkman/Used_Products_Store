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
    const file = document.getElementById('img').files[0];
    const user_name = localStorage.getItem('user_name');
    const status = onAdd(
      {
        name,
        category,
        description,
        quality,
        price,
        details,
        user_name,
      },
      file
    );

    setName('');
    setCategory(categories[0].name);
    setDescription('');
    setQuality('');
    setPrice('');
    setDetails('');
    document.getElementById('img').value = '';
    document.getElementById('preview').style.display = 'none';
    document.getElementById('picture').src = '#';
  };

  function previewImage() {
    let photo = document.getElementById('img');
    let pic = document.getElementById('picture');
    let file = photo.files[0];
    pic.setAttribute('src', URL.createObjectURL(file));
    document.getElementById('preview').style.display = 'block';
  }

  return (
    <div className="container">
      <form id="addForm" onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Product Name"
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
        <label for="img">Choose an image for your product: </label>
        <input
          type="file"
          id="img"
          required
          name="img"
          accept="image/*"
          onChange={previewImage}
        />
        <div id="preview">
          <img alt="your product" id="picture" />
        </div>
        <input type="submit" className="btn" value="Add Product" />
      </form>
    </div>
  );
};
