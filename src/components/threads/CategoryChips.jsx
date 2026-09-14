import { Hash } from 'lucide-react';

function CategoryChips({ categories = [], selectedCategory = '', onSelectCategory }) {
  return (
    <div className="category-chips-wrapper">
      <button
        type="button"
        className={`chip-item ${selectedCategory === '' ? 'active' : ''}`}
        onClick={() => onSelectCategory('')}
      >
        <Hash size={14} />
        <span>Semua Kategori</span>
      </button>

      {categories.map((category) => (
        <button
          key={category}
          type="button"
          className={`chip-item ${selectedCategory === category ? 'active' : ''}`}
          onClick={() => onSelectCategory(category)}
        >
          <Hash size={14} />
          <span>{category}</span>
        </button>
      ))}
    </div>
  );
}

export default CategoryChips;
