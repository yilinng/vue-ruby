<template>
  <div class="userlist">
    <table>
      <thead>   
        <tr>
            <th scope="col">username</th>
            <th scope="col">email</th>
            <th scope="col">role</th>
            <th scope="col">datail</th>
        </tr>
      </thead>
      <tbody>
      <tr class="userTable" v-for="user in users" :key="user.id">        
          <!-- <h3>{{ post.title }}</h3> -->
          
            <td data-label="name">{{ user.username }}</td>
            <td data-label="email">{{ user.email }}</td>
            <td data-label="role">{{ user.role }}</td>
            <td>  
                <router-link :to="{ name: 'UserDetails', params: { id: user.id }}">
                    datail
                </router-link> 
            </td>  
      </tr>
      </tbody>
    </table>
  </div>

</template>

<script>

export default {
  props: ['users'],
 

}
</script>

<style scoped>
 table {
  border: 1px solid #ccc;
  border-collapse: collapse;
  margin: 0;
  padding: 0;
  width: 100%;
  table-layout: fixed;
}

table tr {
  background-color: #f8f8f8;
  border: 1px solid #ddd;
  padding: .35em;
}

table th,
table td {
  padding: .625em;
  text-align: center;
}

table th {
  font-size: .85em;
  letter-spacing: .1em;
  text-transform: uppercase;
}

@media screen and (max-width: 660px) {
  table {
    border: 0;
  }

  table caption {
    font-size: 1.3em;
  }
  
  table thead {
    border: none;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
  }
  
  table tr {
    border-bottom: 3px solid #ddd;
    display: block;
    margin-bottom: .625em;
  }
  
  table td {
    border-bottom: 1px solid #ddd;
    display: block;
    font-size: .8em;
    text-align: right;
  }
  
  table td::before {
    /*
    * aria-label has no advantage, it won't be read inside a table
    content: attr(aria-label);
    */
    content: attr(data-label);
    float: left;
    font-weight: bold;
    text-transform: uppercase;
  }
  
  table td:last-child {
    border-bottom: 0;
  }
}



</style>
