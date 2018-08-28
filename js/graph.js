// var svg = d3.select("svg");
// document.getElementById('main_graph').setAttribute("width", window.innerWidth - 50);

var chartDiv    = document.getElementById("graph_container");
var svg         = d3.select(chartDiv).append("svg");
var width       = chartDiv.offsetWidth;
var height      = chartDiv.offsetHeight;

var square_size     = 5;
var separation      = 1;
var margin_streams  = 5;
var scall           = d3.scaleLinear().domain([0,15]).range([1, 0]);

var data        = [
    {
        "nombre":"z",
        "chat_messages":[
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

var response = $.getJSON( "data.json", function(obtained_data) {
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

    console.log("S");
    console.log("S");
    console.log("S");

    console.log(index);
    console.log(single_chat_history);

    for (var index_dia = 0; index_dia < single_chat_history.chat_messages.length; index_dia++) {
        // draw_chat(i, single_chat_history[i]);

        // console.log(single_chat_history.chat_messages[i]);
        g.selectAll("foo").data(single_chat_history.chat_messages[index_dia]).enter().append("rect")

            .attr("x", function(d, i) { return width - (index_dia + 1) * (square_size+separation); } )
            .attr("y", function(d, i) { return separation + i * (square_size+separation) + index *( margin_streams + 12 * (square_size+separation)); })
            .attr("width" , square_size)
            .attr("height", square_size)

            // .attr("fill", function(d, i) {  console.log(d); } );
            .attr("fill", function(d, i) {  return d3.interpolateYlOrRd(scall(d))} );
            // .attr("fill", function(d, i) {  return d3.interpolateYlOrRd(0.1)} );
            // .attr("fill", function(d, i) {  console.log(d);return d3.interpolateYlOrRd(scall(d[ugh__no_comments[j]]))} );
            // .attr("fill", function(d, i) { return "#d57415"} );



            // .attr("stroke-width", 0.5)
            // .style("stroke-dasharray", ("10,1"))
            // .attr("stroke", "#000000")
            // .attr("stroke-opacity", "0.1");

    }
    console.log("S");
    console.log("S");
    console.log("S");

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
