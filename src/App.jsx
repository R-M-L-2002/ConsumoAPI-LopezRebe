import { useState, useEffect, Fragment } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import 'primereact/resources/themes/md-dark-deeppurple/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import './App.css';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        //usuarios
        const users = await fetch('https://jsonplaceholder.typicode.com/users').then(res => res.json());

        //post y comentario
        const userData = await Promise.all(
          users.map(async (user) => {
            const posts = await fetch(`https://jsonplaceholder.typicode.com/users/${user.id}/posts`).then(res => res.json());
            const post = posts[0];

            const comments = await fetch(`https://jsonplaceholder.typicode.com/posts/${post.id}/comments`).then(res => res.json());
            const comment = comments[0];

            return {
              id: user.id,
              name: user.name,
              email: user.email,
              postTitle: post.title,
              postBody: post.body,
              comment: comment.body,
            };
          })
        );

        setData(userData);

      } catch (error) {
        console.error('Error API:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Fragment className="container">
      <DataTable value={data} paginator rows={5}> {/* paginacion re cheta */}
        <Column field="name" header="Usuario"></Column>
        <Column field="email" header="Email"></Column>
        <Column field="postTitle" header="Titulo"></Column>
        <Column field="postBody" header="Contenido"></Column>
        <Column field="comment" header="Comentario"></Column>
      </DataTable>
    </Fragment>
  );
}

export default App;
