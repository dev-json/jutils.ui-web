export function display_error(message)
{
    const error_bar_element = document.getElementById('error-bar');
    if(error_bar_element == null)
    {
        const notification = document.createElement('div')
        notification.id = 'message-notification';
        notification.classList.add('message-notification');

        const icon = document.createElement('i');
        icon.classList.add('fa-solid', 'fa-circle-info');
        notification.appendChild(icon);

        const text = document.createElement('p');
        text.innerText = message;
        notification.appendChild(text);

        document.body.appendChild(notification);
    }
    else
    {

    }
}