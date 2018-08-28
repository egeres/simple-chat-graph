// var svg = d3.select("svg");
// document.getElementById('main_graph').setAttribute("width", window.innerWidth - 50);

var chartDiv    = document.getElementById("graph_container");
var svg         = d3.select(chartDiv).append("svg");
var width       = chartDiv.offsetWidth;
var height      = chartDiv.offsetHeight;

var square_size     = 5;
var square_size     = 6;
var separation      = 1;
var margin_streams  = 5;
var scall           = d3.scaleLinear().domain([0,500]).range([1, 0]);
var display_mode    = "1";

var data        = [
    {
        "nombre":"z",
        "chat_messages_1": [0,0,0,0,0,0,0,0,0,0],
        "chat_messages_4": [[0,0,0,0],[1,1,1,1]],
        "chat_messages_12":[
            [7,7,7,7, 0,0,0,0, 1,1,1,1],
            [6,6,6,6, 0,0,0,0, 1,1,1,1],
            [5,5,5,5, 0,0,0,0, 1,1,1,1],
            [4,3,3,3, 0,0,0,0, 3,3,3,3],
            [2,2,2,2, 0,0,0,0, 2,2,2,2],
            [1,1,1,1, 0,0,0,0, 1,1,1,1]
        ]
    }
];

// setTimeout()
// $.getJSON("data.json", function() { console.log(">>asdasd>"); } );
// $.getJSON("data.json", function(data_text) { console.log(">>>" + data_text); data = data_text; } );
// $.getJSON("data.json", function(data_text) { console.log("hayyy =" + data_text); } );

var response = $.getJSON( "data_0.json", function(obtained_data) {
    data = obtained_data;
    console.log( "success" );
})
.done(  function() {  console.log( "second success" ); })
.fail(  function() {  console.log( "error" ); })
.always(function() {  console.log( "complete" ); });


console.log(data);

function resize_svg() {
    console.log("Resizing...");

    width  = chartDiv.offsetWidth;
    height = chartDiv.offsetHeight;
    svg.attr("width", width).attr("height", height);
}

function draw_chat(index, single_chat_history) {

    var g = svg.append("g").attr("transform", "translate(0, 0)");

    if (display_mode == "1") {

        // console.log(single_chat_history.chat_messages_1);
        // typeof single_chat_history.chat_messages_1;
        // typeof [0,0,0,0];

        g.selectAll("foo").data(single_chat_history.chat_messages_1).enter().append("rect")
        // g.selectAll("foo").data([0,0,0,100]).enter().append("rect")
            .attr("x", function(d, i) { return width - (i + 1) * (square_size+separation); } )
            // .attr("y", function(d, i) { return separation + i * (square_size+separation) + index *( margin_streams + 12 * (square_size+separation)); })
            .attr("y", function(d, i) { return separation + index *( margin_streams + 1 * (square_size+separation)); })
            .attr("width" , square_size)
            .attr("height", square_size)
            .attr("fill", function(d, i) {  return d3.interpolateYlOrRd(scall(d))} );
    }
    if (display_mode == "4") {
    }
    if (display_mode == "12") {
        for (var index_dia = 0; index_dia < single_chat_history.chat_messages_12.length; index_dia++) {
            g.selectAll("foo").data(single_chat_history.chat_messages_12[index_dia]).enter().append("rect")
                .attr("x", function(d, i) { return width - (index_dia + 1) * (square_size+separation); } )
                .attr("y", function(d, i) { return separation + i * (square_size+separation) + index *( margin_streams + 12 * (square_size+separation)); })
                .attr("width" , square_size)
                .attr("height", square_size)
                .attr("fill", function(d, i) {  return d3.interpolateYlOrRd(scall(d))} );
        }
    }

}

function redraw() {
    console.log("Redrawing graph...");

    svg.selectAll("*").remove();
    resize_svg();

    for (var i = 0; i < data.length; i++) {
        draw_chat(i, data[i]);
    }
}


// setTimeout(function(){   $.getJSON("data.json", function() { console.log(">>asdasd>"); } );   }, 500);


redraw();
// setTimeout(function(){ redraw(); }, 500);
window.addEventListener("resize", redraw);

console.log("asdasdads");
