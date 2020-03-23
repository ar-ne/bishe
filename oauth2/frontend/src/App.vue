<template>
    <div id="app">
        <RouterView></RouterView>
        <footer>
            <router-link to="/registration">注册</router-link>
            |
            <router-link to="/admin">管理</router-link>
        </footer>
    </div>
</template>

<script>
  export default {
    name: 'app',
    components: {},
  }
</script>

<style>
    footer {
        bottom: 0;
        float: top;
        padding: 10px;
        position: fixed;
        left: 0;
        right: 0;
        width: auto;
    }

    footer a {
        font-weight: bold;
        color: #2c3e50;
    }

    footer a.router-link-exact-active {
        color: #42b983;
    }

    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 0;
    }

    a {
        text-decoration: none;
    }
</style>
