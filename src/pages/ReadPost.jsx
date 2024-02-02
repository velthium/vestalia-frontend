import PageTitle from "@/components/Design/PageTitle";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";

function ReadPost() {
    const [loading, setLoading] = useState(true);
    const [post, setPost] = useState({});
    const { postid } = useParams();

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch('http://localhost:8080/v1/graphql', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'x-hasura-admin-secret': 'your-admin-secret',
              },
              body: JSON.stringify({
                query: `
                  query getPost($id: bigint!) {
                    post(where: { id: { _eq: $id } }) {
                      id
                      text
                      subspace_section {
                        name
                        id
                      }
                    }
                  }
                `,
                variables: {
                  id: postid,
                },
              }),
            });
    
            const result = await response.json();


            if (response.ok) {
              console.log(result.data.post[0])
              setPost(result.data.post[0])
            } else {
              setError(result.errors);
            }
          } catch (err) {
            console.log(err)
            setError(err.message);
          } finally {
            setLoading(false);
          }
        };
    
        fetchData();
      }, []);

    return(
      <PageTitle title={post.text} />
    )
}

export default ReadPost;