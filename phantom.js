var page = new WebPage();

page.paperSize = {
    format        : "A4",
    orientation    : "portrait",
    margin        : { left:"0cm", right:"0cm", top:"0cm", bottom:"0cm" }
};

page.open('http://127.0.0.1:3978/invoice.html', function () {
    page.render('./invoice.pdf');
    phantom.exit();
});