// components/CategoryList.js
import Image from "next/image";

export default function CategoryList({ categories }) {
  return (
    <section className="my-10">
      <h2 className="text-xl font-semibold mb-4">Shop by Category</h2>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
        {categories.map((cat) => (
          <div
            key={cat._id}
            className="bg-white p-4 rounded shadow text-center hover:shadow-md"
          >
            {/* category icon */}
            <div className="mb-2 flex justify-center">
              {cat.icon ? (
                <Image
                  src={cat.icon}
                  alt={cat.categoryName}
                  width={50}
                  height={50}
                  className="object-contain"
                />
              ) : (
                <span className="text-gray-400">📦</span>
              )}
            </div>

            {/* category name */}
            <p className="font-medium">{cat.categoryName}</p>

            {/* subcategories (optional) */}
            {cat.subCategories?.length > 0 && (
              <div className="mt-2 text-sm text-gray-500">
                {cat.subCategories.map((sub) => (
                  <span key={sub._id} className="block">
                    {sub.subCategoryName}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
