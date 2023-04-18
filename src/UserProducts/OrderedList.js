function OrderedList() {
    return (
      <div>
        <h1>Ordered Products</h1>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {orderedProducts.map((product) => (
              <tr key={product.id}>
                <td>{product.productId}</td>
                <td>{product.productName}</td>
                <td>{product.productPrice}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  export default OrderedList;
  