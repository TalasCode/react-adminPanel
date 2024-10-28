import React, { useState } from 'react';
import './AddRole.css'; // Ensure this CSS file has necessary styles
import axios from 'axios';
import { toast } from 'react-toastify';

const AddRole = ({ url }) => {
    const [roleName, setRoleName] = useState('');
    const token = localStorage.getItem("token");
    const [permissions, setPermissions] = useState({
        orders: {
            canViewOrder: false,
            canAddOrder: false,
            canEditOrderStatus: false,
        },
        users: {
            canViewUsers: false,
            canAddUser: false,
            canGetByUsername: true, // Always checked
            canGetByRoleId: true, // Always checked
            // Additional hardcoded permissions not displayed
            canViewUserDetails: true, // Hardcoded permission
            canEditUser: true, // Hardcoded permission
        },
        roles: {
            canAddRole: false,
        },
        brands: {
            canViewBrand: false,
            canAddBrand: false,
        },
        categories: {
            canViewCategory: false,
            canAddCategory: false,
        },
        items: {
            canViewItems: false,
            canEditItem: false,
            canAddItem: false,
        },
        coupons: { 
            canViewCoupons: false,
            canAddCoupon: false,
            canEditCoupon: false,
        },
        offers: { 
            canViewAllOffers: false,
            canAddOffer: false,
        },
        carts: { 
            ManageCart: false, 
        },
    });

    const handleRoleNameChange = (e) => {
        setRoleName(e.target.value);
    };

    const toggleCategoryPermission = (category) => {
        const allChecked = !permissions[category].canViewOrder; // Toggle based on the main checkbox
        setPermissions((prev) => {
            const newCategoryPermissions = {};
            for (const perm in prev[category]) {
                newCategoryPermissions[perm] = allChecked; // Set all permissions to the new checked state
            }
            return {
                ...prev,
                [category]: newCategoryPermissions,
            };
        });
    };

    const togglePermission = (category, permission) => {
        setPermissions((prev) => ({
            ...prev,
            [category]: {
                ...prev[category],
                [permission]: !prev[category][permission],
            },
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const trimmedRoleName = roleName.trim();
        
        // Ensure the trimmed name is not empty
        if (!trimmedRoleName) {
            toast.error("Role name cannot be empty.");
            return;
        }
    
        const roleData = {
            name: trimmedRoleName,
        };
    
        try {
            // Step 1: Add the role
            const roleResponse = await axios.post(`https://localhost:7274/api/Role/add`, roleData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
    
            if (roleResponse.data) {
                // Step 2: Handle successful role creation
                const roleId = roleResponse.data.id; // Assuming the API returns the newly created role ID
                console.log(roleId);
            
                // Prepare permissions to add
                const permissionsToAdd = Object.entries(permissions).flatMap(([category, perms]) => 
                    Object.entries(perms)
                        .filter(([perm, allowed]) => allowed)
                        .map(([perm]) => ({
                            roleId,
                            permission: mapPermissionToApi(perm), // Map to API endpoint
                        }))
                ).filter(permission => permission.permission); // Filter out any undefined values

                console.log(permissionsToAdd);
                if (permissions.roles.canAddRole) {
                    permissionsToAdd.push(
                        { roleId, permission: '/api/UserPermission/add' })}
                        if (permissions.carts.ManageCart) { console.log("enter if cart");
                            permissionsToAdd.push(
                                { roleId, permission: '/api/Cart/getAll' },
                                { roleId, permission: '/api/Cart/delete' },
                                { roleId, permission: '/api/Cart/update' },
                                { roleId, permission: '/api/Cart/getById' }
                            );
                        }
                        if (permissions.orders.canAddOrder) { console.log("enter if order");
                            permissionsToAdd.push(
                                {roleId, permission: "/api/orderItem/add"},
                                {roleId, permission: "/api/orderItem/getAll"},
                                {roleId, permission:"/api/Order/getOrderByUser"}
                            );
                        }
                permissionsToAdd.push(
                        { roleId, permission: '/api/Role/getAll' },
                        { roleId, permission: '/api/Coupon/getCoupon' },
                        { roleId, permission: '/api/Coupon/getCouponById' },
                        {roleId, permission: "/api/User/getById"},
                       
                    )
                // Step 3: Add user permissions
                for (const permission of permissionsToAdd) {
                    const permissionResponse = await axios.post(`https://localhost:7274/api/UserPermission/add`, permission, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                
                    if (!permissionResponse.data) {
                        toast.error(`Failed to add permission: ${permission.permission}`);
                    } else {
                        toast.success(`Permission added: ${permission.permission}`);
                    }
                }
                
                toast.success("Role and permissions added successfully!");
                // Reset form
                setRoleName('');
                setPermissions({
                    orders: {
                        canViewOrder: false,
                        canAddOrder: false,
                        canEditOrderStatus: false,
                    },
                    users: {
                        canViewUsers: false,
                        canAddUser: false,
                        canGetByUsername: true, // Reset to always checked
                        canGetByRoleId: true, // Reset to always checked
                        canViewUserDetails: true, // Reset hardcoded permission
                        canEditUser: true, // Reset hardcoded permission
                    },
                    roles: {
                        canAddRole: false,
                        // canViewRoles : true,
                    },
                    brands: {
                        canViewBrand: false,
                        canAddBrand: false,
                    },
                    categories: {
                        canViewCategory: false,
                        canAddCategory: false,
                    },
                    items: {
                        canViewItems: false,
                        canEditItem: false,
                        canAddItem: false,
                    },
                    coupons: { 
                        canViewCoupons: false,
                        canAddCoupon: false,
                    },
                    offers: { 
                        canViewAllOffers: false,
                        canAddOffer: false,
                    },
                    carts: { 
                        ManageCart: false, 
                    },
                });
            } else {
                toast.error("Failed to add role.");
            }
            
        } catch (error) {
            console.error('Error response:', error.response);
            console.error('Error message:', error.message);
            toast.error('Error adding role and permissions');
        }
    };

    // Map permissions to corresponding API endpoints
    const mapPermissionToApi = (permission) => {
        const apiPermissionMap = {
            canViewOrder: '/api/Order/getAll',
            canAddOrder: '/api/Order/add',
            canEditOrderStatus: '/api/Order/update',
            canViewUsers: '/api/User/getAll',
            canAddUser: '/api/User/add',
            canGetByUsername: '/api/User/getByUsername', // New mapping for getting user by username
            canGetByRoleId: '/api/UserPermission/getByRoleId', // New mapping for getting user permissions by role ID
            canViewUserDetails: '/api/User/getUserDetails', // Hardcoded permission mapping
            canEditUser: '/api/User/Update', // Hardcoded permission mapping
            canAddRole: '/api/Role/add',
            canViewRoles: '/api/Role/getAll',
            canViewBrand: '/api/Brand/getAll',
            canAddBrand: '/api/Brand/add',
            canViewCategory: '/api/Category/getAll',
            canAddCategory: '/api/Category/add',
            canViewItems: '/api/Item/getAll',
            canEditItem: '/api/Item/update',
            canAddItem: '/api/Item/add',
            canViewCoupons: '/api/Coupon/getAll', // New mapping for viewing coupons
            canAddCoupon: '/api/Coupon/add', 
            canEditCoupon: '/api/Coupon/update',
            canViewAllOffers: '/api/Offer/getAll', // New mapping for viewing all offers
            canAddOffer: '/api/Offer/add', 
            ManageCart: '/api/Cart/add'
            
        };

        return apiPermissionMap[permission] || null; // Return null for undefined permissions
    };

    return (
        <div className="add-role">
            <form className="flex-col" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="role-name">Role Name:</label>
                    <input
                        type="text"
                        id="role-name"
                        value={roleName}
                        onChange={handleRoleNameChange}
                        placeholder="Enter role name"
                        required
                    />
                </div>

                <h2>Permissions</h2>
                <div className="permissions-group">
                    {Object.entries(permissions).map(([category, perms]) => (
                        <div className="permission-category" key={category}>
                            <h3>
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={Object.values(perms).every(Boolean)} // Check if all are true
                                        onChange={() => toggleCategoryPermission(category)}
                                    />
                                    {category.charAt(0).toUpperCase() + category.slice(1)} {/* Capitalize category name */}
                                </label>
                            </h3>
                            {Object.entries(perms).map(([perm, allowed]) => (
                                !['canGetByUsername', 'canGetByRoleId', 'canViewUserDetails', 'canEditUser'].includes(perm) && ( // Only show relevant permissions
                                    <label key={perm}>
                                        <input
                                            type="checkbox"
                                            checked={allowed} // Check if the permission is allowed
                                            onChange={() => togglePermission(category, perm)} // Toggle permission
                                        />
                                        {perm.charAt(0).toUpperCase() + perm.slice(1).replace(/([A-Z])/g, ' $1')} {/* Format permission name */}
                                    </label>
                                )
                            ))}
                        </div>
                    ))}
                </div>

                <button type="submit" className="add-btn">ADD ROLE</button>
            </form>
        </div>
    );
};

export default AddRole;