module.exports = (function () {
    return {           
            validateMessage: {           
                messageEmail: {
                    notValid: "L'email renseigné n'est pas valide",
                    message: "Aucun utilisateur ne correspond à cet email",
                    emailExist: "Un utilisateur possède déja cet email"
                },
                messagePassword: {
                    notValid: "Le mot de passe est invalide",
                    infosContentPassword: "Le mot de passe doit contenir au moins 8 caractères et un chiffre",
                    notSamePassword: "Les deux mots de passes doivent être identiques",
                    
                },
                messageName: {
                    nameLength: "La longueur de votre nom doit être comprise entre 3 et 15 caractères inclus"
                },
                success: {
                    register: "Enregistré avec succès !"
                }
            },
            errors: {
                internalErrorServer: {
                    register: "Une erreur est survenue lors de l'enregistrement",
                    login: "Une erreur est survenue lors de l'identification"
                },
                invalidChar : "Des caractères invalident ont été détectés. Veuillez entrer des informations valides"
            }
    };
})()