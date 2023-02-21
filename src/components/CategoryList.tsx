import Link from "next/link";

const CategoryList = ({categories}: {categories:string[]}) => {
    return (
        <ul>
            {categories.map(category =>(
                <li key={category}>
                     <Link href={`/categories/${category}`}>{category}</Link>
                </li>
            ))}
        </ul>
    )
}

export default CategoryList;