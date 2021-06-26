export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    };
};

export const checkValidity = (value, rules) => {
    let isValid = true;

    if (!rules) {
        return true;
    }

    if (rules.required) {
        isValid = value.trim() !== '' && isValid;
    }
    if (rules.minLength) {
        isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
        isValid = value.length <= rules.maxLength && isValid;
    }

    if (rules.isEmail) {
        const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        isValid = pattern.test(value) && isValid;
    }

    if (rules.isNumeric) {
        const pattern = /^\d+$/;
        isValid = pattern.test(value) && isValid;
    }

    return isValid;
}

export const getAction = (type, status) => {
    let actions = {
        'admin': status === 1 ? 'Cancelar' : 'NA',
        'chef': status === 1 ? 'Preparar' : (status === 2 ? 'Terminar' : 'NA'),
        'mesero': status === 3 ? 'Entregar' : 'NA',
        'cliente': status === 1 ? 'Cancelar' : 'NA',
    }
    return actions[type];
}



export const getStatus = (status) => {
    let listStatus = {
        0: 'Cancelado',
        1: 'Pendiente',
        2: 'Preparando',
        3: 'Preparado',
        4: 'Entregado'
    }
    return listStatus[status]
}

export const timeInterval = 2500;