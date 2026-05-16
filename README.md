# hikaru.org

hikaru.org hosts a couple of scripts:

 - create-vm: Set up a VM in Ubuntu
 - delete-vm: Delete a VM created with create-vm
 - auto-updates: Configure Ubuntu to automatically update only security updates

 ## Running the VM scripts

    curl -s https://hikaru.org/create-vm | bash
    curl -s https://hikaru.org/delete-vm | bash


## Configuring automatic updates

    curl -s https://hikaru.org/auto-updates | bash