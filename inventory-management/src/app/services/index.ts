import { formatDate } from '@angular/common';

export const getDateString = (datetime: string) => {
    var datetimeString = formatDate(
        new Date(datetime).toLocaleString(),
        'dd/MM/yyyy hh:mm:ss a',
        'en-US',
        'GMT+07:00'
    );

    var arrDatetime = datetimeString.split(' ');

    arrDatetime.forEach((element) => {
        if (arrDatetime.indexOf(element) === 2) {
            if (element == 'PM') {
                arrDatetime[2] = 'CH';
            } else {
                arrDatetime[2] = 'SA';
            }
        }
    });

    return arrDatetime[0] + ' ' + arrDatetime[1] + ' ' + arrDatetime[2];
};

// Define API
const baseURL = 'http://192.168.2.212:6789/api/';

//BrandsAPI
export const getAllBrands = baseURL + 'Brands';
export const getBrandsByCatId = baseURL + 'Brands/';
export const getBrandsByBrandId = baseURL + 'Brands/name/';

//CategoriesAPI
export const getAllCategories = baseURL + 'Categories';
export const getCategoriesByCatId = baseURL + 'Categories/name/';
export const getCategoriesByBrandId = baseURL + 'Categories/';

//ProductAPI
export const getAllProduct = baseURL + 'Products';
export const getProductById = baseURL + 'Products/';
export const postProduct = baseURL + 'Products';
export const putProduct = baseURL + 'Products/';
export const putDelProduct = baseURL + 'Products/delete/';
export const deleteProduct = baseURL + 'Products/';

//LoginAPI
export const postLogin = baseURL + 'Users/login';
export const getUserName = baseURL + 'Users/name';
