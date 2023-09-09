# portfolio

### API endpoints:<br/>  
1. *[api-endpoint]/home/about-me*  
**Returns**: the about me information of the portfolio author  
**Response data example**: {  
    "firstName": "Saikat",  
    "lastName": "Mondal",  
    "title": "Web developer & designer",  
    "subTitle": "Practicing development since 2018",  
    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vitae quam sit amet lacus mollis rutrum. Vestibulum anteipsum primis in faucibus orci luctus et ultrices posuere cubilia curae.",  
    "profilePic": "https://i.pinimg.com/originals/85/a1/41/85a141abeb4c84cad5c24128b3cddce7.jpg",  
    "skillSet": {  
        "PHP": 80,  
        "Laravel": 50,  
        "WordPress": 95,  
        "Html & Css": 95,  
        "Javascript": 75  
    },  
    "skillDescription": "Sed consequat ex quis mattis scelerisque. Maecenas nec tellus lacinia enim maximus suscipit ac nec ante. Sed cursus quam vel finibus imperdiet",  
    "cvFile": url of the user's cv file,  
    "facebook": "",  
    "instagram": "",  
    "twitter": ""  
}

2. *[api-endpoint]/home/project-categories*  
**Returns**: the project categories available in the portfolio  
**Response data example**: [  
    {
        id: projectCategoryId,  
        value: projectCategoryValue  
    }  
]  

3. *[api-endpoint]/home/projects?categoryId*  
**Returns**: the projects of a given category. Takes default categoryId = 1  
**Response data example**: {  
    name: projectName,  
    link: project url for redirection,  
    image: the image linked with the project  
}  

4. *[api-endpoint]/home/blogs?pageNo*  
**Returns**: a list of blogs by page number with each page containing 6 blogs  
**Response data example**: {  
    "blogs": [  
        {  
            "id": "c98c0e75-7aea-4542-8bd4-9b0da8dcd3e4",  
            "title": "Lorem ipsum",  
            "shortDescription": "Lorem ipsum",  
            "image": "\\x5b6f626a65637420426c6f625d",  
            "createdAt": "2023-09-05T09:43:27.970Z",  
            "firstName": "Saikat",  
            "lastName": "Mondal"  
        }  
    ],  
    "end": true, (this parameter tells if there are any more blogs available or not)  
    "maxBlogs": 1, (this parameter returns the total number of blogs available)  
    "numberOfBlogsPerPage": "6" (this parameter returns the value taken as the size of entries to be returned per page)  
}

5. *[api-endpoint]/blogs*  
**Returns**: Returns a list of 3 blogs per category  
**Response data example**: [  
    {  
        "categoryValue": "UI & UX Design",  
        "categoryId": "1",  
        "blogs": [  
            {  
                "id": "c98c0e75-7aea-4542-8bd4-9b0da8dcd3e4",  
                "title": "Lorem ipsum",  
                "views": "24",  
                "content": "Lorem ipsum",  
                "shortDescription": "Lorem ipsum",  
                "image": "\\x5b6f626a65637420426c6f625d",  
                "createdAt": "2023-09-05T09:43:27.970Z",  
                "firstName": "Saikat",  
                "lastName": "Mondal"  
            }  
        ]  
    }  
]  

6. *[api-endpoint]/blogs?categoryId=2*  
**Returns**: all the blogs of given category  
**Response data example**: [  
    {  
        "id": "c98c0e75-7aea-4542-8bd4-9b0da8dcd3e4",  
        "title": "Lorem ipsum",  
        "shortDescription": "Lorem ipsum",  
        "image": "\\x5b6f626a65637420426c6f625d",  
        "createdAt": "2023-09-05T09:43:27.970Z",  
        "firstName": "Saikat",  
        "lastName": "Mondal"  
    }  
]  

7. *[api-endpoint]/blogs/:blogId*  
**Returns**: details of a single blog.  
**Response data example**: {  
    "blog": {  
        "id": "c98c0e75-7aea-4542-8bd4-9b0da8dcd3e4",  
        "title": "Lorem ipsum",  
        "views": "24",  
        "content": "Lorem ipsum",  
        "shortDescription": "Lorem ipsum",  
        "image": "\\x5b6f626a65637420426c6f625d",  
        "createdAt": "2023-09-05T09:43:27.970Z",  
        "updatedAt": "2023-09-06T12:38:13.040Z",  
        "AuthorId": "1",  
        "CategoryId": "1"  
    },  
    "author": {  
        "firstName": "Saikat",  
        "lastName": "Mondal"  
    },  
    "prevPost": null,  
    "nextPost": null  
}  

8. *[api-endpoint]/blogs/comments/:blogId  
**Returns**: all the comments on the given blog  
**Response**: [  
    {  
        "name": "John Doe",  
        "message": "nice",  
        "createdAt": "2023-09-06T09:41:32.258Z",  
        "replies": [  
            {  
                "name": "Anthony Smith",  
                "message": "nice",  
                "createdAt": "2023-09-06T09:46:20.834Z"  
            }  
        ]  
    },  
    {  
        "name": "tristan",  
        "message": "good",  
        "createdAt": "2023-09-07T07:09:26.049Z",  
        "replies": []  
    }  
]  

9. *[api-endpoint]/blogs?tagId=1*  
**Returns**: all blogs given by the given tag  
**Response data example**: [  
    {  
        "title": "Lorem ipsum",  
        "shortDescription": "Lorem ipsum",  
        "image": "\\x5b6f626a65637420426c6f625d",  
        "id": "c98c0e75-7aea-4542-8bd4-9b0da8dcd3e4",  
        "createdAt": "2023-09-05T09:43:27.970Z",  
        "firstName": "Saikat",  
        "lastName": "Mondal"  
    }  
]  

10. *[api-endpoint]/categories*  
**Returns**: all the categories available in the database  
**Response data example**: [  
    {  
        "id": "1",  
        "value": "UI & UX Design"  
    }  
]  

11. *[api-endpoint]/tags*  
**Returns**: all the tags available in the database  
**Response data example**: [  
    {  
        "id": "1",  
        "value": "UI & UX Design"  
    }  
]  

12. *[api-endpoint]/blogs/popular-posts*  
**Returns**: top 4 popular posts based on number of views  
**Response data example**: [  
    {  
        "id": "c98c0e75-7aea-4542-8bd4-9b0da8dcd3e4",  
        "title": "Lorem ipsum",  
        "image": "\\x5b6f626a65637420426c6f625d",  
        "createdAt": "2023-09-05T09:43:27.970Z",  
        "firstName": "Saikat",  
        "lastName": "Mondal"  
    }  
]  

13. *[api-endpoint]/blogs/suggestions/:categoryId*  
**Returns**: 3 posts as suggestions based on the category id provided  
**Response data example**: [  
    {  
        "id": "c98c0e75-7aea-4542-8bd4-9b0da8dcd3e4",  
        "title": "Lorem ipsum",  
        "shortDescription": "Lorem ipsum",  
        "image": "\\x5b6f626a65637420426c6f625d",  
        "createdAt": "2023-09-05T09:43:27.970Z",  
        "firstName": "Saikat",  
        "lastName": "Mondal"  
    }  
]  

14. *[api-endpoint]/search?searchquery=lorem*  
**Returns**: posts having the given search query as a substring in either it's title or description  
**Response data example**: [  
    {  
        "id": "c98c0e75-7aea-4542-8bd4-9b0da8dcd3e4",  
        "title": "Lorem ipsum",  
        "views": "25",  
        "shortDescription": "Lorem ipsum",  
        "image": "\\x5b6f626a65637420426c6f625d",  
        "createdAt": "2023-09-05T09:43:27.970Z",  
        "firstName": "Saikat",  
        "lastName": "Mondal"  
    }  
]  

15. *[api-endpoint]/contact-me*  
**Body of request example**: {  
    "firstName": "John",  
    "lastName": "Doe",  
    "email": "email@gmail.com",  
    "message": "Nice portfolio"  
}  
**Returns**: thank you message  
**Response**: "Your message has been registered"  

16. *[api-endpoint]/blogs/comment/:blogId*  
**Body of request example**: {  
    "name": "tristan",  
    "email": "tristan@gmail.com",  
    "message": "good"  
    "website": ""  
} (name and message are required)  
**Returns**: data of comment  
**Response data example**: {  
    "website": "",  
    "id": "8",  
    "BlogId": "c98c0e75-7aea-4542-8bd4-9b0da8dcd3e4",  
    "name": "tristan",  
    "message": "good",  
    "email": "tristan@gmail.com",  
    "createdAt": "2023-09-09T14:00:14.003Z"  
}  