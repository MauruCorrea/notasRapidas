let form = document.querySelector('#form_01');
form.addEventListener("submit", onSubmit);

const usuario = {
    userId: 'admin',
    password: '123456'

}
function onSubmit(event) {
    event.preventDefault()

    let user = form.querySelector('#userExample').value
    let password = form.querySelector('#passwordExample').value

    if(user === usuario.userId || password === usuario.password){
        sessionStorage.setItem('logado', true)
        window.location = 'index.html'
    }else{
        sessionStorage.setItem('logado', false)
    }
}

