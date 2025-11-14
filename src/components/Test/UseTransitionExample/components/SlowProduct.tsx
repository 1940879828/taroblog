import React, {PropsWithChildren} from 'react'
import {Product} from "@/components/Test/UseTransitionExample/data";

interface Props {
  product: Product
}

const SlowProduct: React.FC<PropsWithChildren<Props>> = ({product}) => {
  return (
    <li className="">
      <p>{product.name}</p>
      <p>{product.description}</p>
      <p>{product.material}</p>
      <p>{product.price}</p>
      <p>{product.department}</p>
      <p>{product.quantity}</p>
      <p>{product.color}</p>
    </li>
  );
};

export default SlowProduct;