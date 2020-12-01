import React, { useState } from 'react';
import Helper from 'Lib/helper';
import CONSTANTS from 'Components/constants';

const ProductContext = React.createContext();

const ProductProvider = props => {
  const [isReady, setReady] = useState(false);
  const [CataList, setCataList] = useState(null);
  const [ProductList, setProductList] = useState(null);

  // CataList 格式
  //   {
  //        4: {                // Catalog id
  //            group: [1],     // Product Group
  //            name: "亞洲",   // Catalog Name
  //            parent: 6,
  //            sort: 1,
  //        }
  //   }

  // Product 格式
  //   {
  //        4: [
  //                {
  //                    productId: '002019001',
  //                    productName: "日本5日",
  //                    pic_src: ...,
  //                },
  //                {
  //                    productId: '002019002',
  //                    productName: "韓國7日",
  //                    pic_src: ...,
  //                },
  //           ]
  //   }

  const checkAPI = () => {
    if (isReady === false) {
      setReady('ready');
      Helper.fetch.GET(
        CONSTANTS.API.PRODUCT(),
        cb => {
          if (cb !== undefined) {
            setCataList(processCata(cb.catalogList));
            setProductList(processProduct(cb.productList));
            setReady(true);
          } else {
          }
        },
        () => {
          setReady('error');
        }
      );
    }
    return null;
  };

  // 整理Catalog List Mapping關聯
  const processCata = data => {
    // 遞迴整理資料
    let obj = {};
    const fn = child =>
      child.map(item => {
        if (item.parent_id !== undefined) {
          // parent 有子Data
          const o = {
            sort: item.sort,
            name: item.parent_name,
            parent: item.parent,
            group: []
          };
          obj[item.parent_id] = o;

          fn(item.data);
        } else if (item.parent === null && item.data === undefined) {
          // parent 無子Data
          const o = {
            sort: item.sort,
            name: item.catalog_name,
            group: [item.catalog_id]
          };
          obj[item.catalog_id] = o;
        } else {
          // child
          // 遞迴設定 Catalog Group
          const setChild = pid => {
            if (pid !== '' && pid !== null) {
              obj[pid].group.push(item.catalog_id);
              setChild(obj[pid].parent);
            }
          };
          setChild(item.parent);
        }

        return null;
      });

    fn(data);
    return obj;
  };

  // 整理Product List
  const processProduct = data => {
    const obj = {};
    data.map(item => (obj[item.catalog_id] = item.product));
    return obj;
  };

  // 取得產品資料
  const getProductInfo = pID => {
    let value = null;
    if (ProductList === null) return value;

    Object.keys(ProductList).map(group =>
      ProductList[group].map(product => {
        if (product.productId === pID) value = product;
      })
    );
    return value;
  };

  return (
    <ProductContext.Provider
      value={{
        checkAPI,
        isReady,
        CataList,
        ProductList,
        getProductInfo
      }}
    >
      {props.children}
    </ProductContext.Provider>
  );
};

const ProductConsumer = ProductContext.Consumer;

export default ProductProvider;
export { ProductConsumer, ProductContext };
