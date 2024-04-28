import Link from 'next/link';
import {Logo} from '../common';

const footerData = [
  {
    title: 'For Her',
    items: [
      'Women Jeans',
      'Tops and Shirts',
      'Women Jackets',
      'Heels and Flats',
      'Women Accessories',
    ],
  },
  {
    title: 'For Him',
    items: [
      'Men Jeans',
      'Men Shirts',
      'Men Shoes',
      'Men Accessories',
      'Men Jackets',
    ],
  },
];

export const Footer = () => {
  return (
    <footer className="next-ui bg-primary w-full py-4">
      <Link className="flex justify-center mb-2" href="#">
        <Logo/>
      </Link>
      {footerData.map((section) => (
        <div key={section.title} className="flex flex-col text-center space-y-2 py-4 px-4">
          <h3 className="text-white text-md font-medium">{section.title}</h3>
          <ul className="list-none">
            {section.items.map((item) => (
              <li key={item} className="text-sm text-white hover:text-gray-200">
                <Link href="#">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </footer>
  );
};