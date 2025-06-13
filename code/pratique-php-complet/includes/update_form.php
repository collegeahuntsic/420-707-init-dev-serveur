<?php
echo "
 <h2>Modifier un utilisateur</h2>
 <form method='POST'>
     <input type='hidden' name='update_id' value=" . $_POST['update'] . ">
     <label> Nom: <input type='text' name='update_name' value=''></label> <br>
     <label> Email: <input type='email' name='update_email' value=''></label> <br>
     <label> Age: <input type='number' name='update_age' value=''></label> <br>
     <label> Telephone: <input type='tel' name='update_phone' value=''></label> <br>

     <input type='submit' value='Envoyer'>
 </form>
 ";