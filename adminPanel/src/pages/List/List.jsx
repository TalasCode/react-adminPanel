import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './List.css'; // Add your styles

const List = ({ url }) => {
    const [items, setItems] = useState([]);
    const [permissions, setPermissions] = useState([]);
    const [newStock, setNewStock] = useState(0);

    const token = localStorage.getItem("token");
    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await axios.get(`https://localhost:7274/api/Item/getAll` ,  {headers: {
                  Authorization: `Bearer ${token}`,
              },
          });
                setItems(response.data.$values);
                console.log(response);
            } catch (error) {
                console.error('Error fetching items:', error);
            }
        };

        fetchItems();
    }, [url]);

    const handleStockUpdate = async (itemId, name, price, brandId, description ,categoryId, stock, picture, addedStock) => {
      try {
        const updatedStock = stock + parseInt(addedStock, 10);
          const item = {
              
              name: name,
              price: price,
              description: description,
              brandId: brandId,
              categoryId: categoryId,
              stock: updatedStock,
              picture: picture
          };
          
          const response = await axios.put(`https://localhost:7274/api/Item/update/${itemId}`, item, {
              headers: {
                  Authorization: `Bearer ${token}`,
              },
          });
        console.log(response);
          setItems((prevItems) => 
              prevItems.map(it => it.id === itemId ? { ...it, stock: updatedStock } : it)
          );
      } catch (error) {
          console.error('Error updating stock:', error);
      }
  };
  
    useEffect(() => {
      const fetchPermissions = async () => {
        try {
          const token = localStorage.getItem('token');
          const roleId = localStorage.getItem("RoleId");
          const response = await axios.get(`https://localhost:7274/api/UserPermission/getByRoleId/${roleId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          
          // Log the response to check its structure
          console.log(response.data);
          
          // Directly set the permissions if it's an array of strings
          setPermissions(response.data.$values); // Assuming the API returns an array of permission strings
        } catch (error) {
          console.error('Error fetching permissions:', error);
        }
      };
  
      fetchPermissions();
    }, []);
  
    // Updated hasPermission function
    function hasPermission(requiredPermission) {
      return permissions.includes(requiredPermission);
    }
    return (
      
        <div className="item-list">
           <div class="item-list-header">
    <h1 class="item-list-title">Item Inventory</h1>
    <p class="item-list-description">Overview of all items in stock</p>
    
</div>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Description</th>
                        <th>Stock</th>
                        <th>Edit Stock</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map(item => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>${item.price}</td>
                            <td>{item.description}</td>
                            <td className={item.stock < 5 ? 'low-stock' : ''}>
                                {item.stock < 5 ? (
                                    <span className="low-stock-warning">Low Stock ({item.stock})</span>
                                ) : (
                                    item.stock
                                )}
                            </td>
                            <td>
    {hasPermission("/api/Item/update") && (
        <div className="stock-update-container">
            <input 
                type="number" 
                min="1" 
                placeholder="Quantity" 
                className="quantity-input"
                onChange={(e) => setNewStock(e.target.value)}
            />
            <button onClick={() => handleStockUpdate(item.id ,item.name, item.price,item.brandId ,item.description,item.categoryId, item.stock,item.picture, newStock)}>
                Add Stock
            </button>
        </div>
    )}
</td>

                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default List;