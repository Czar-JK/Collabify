
var percent = 85;
 
var ratio=percent/100;
 
var pie=d3.layout.pie()
        .value(function(d){return d})
        .sort(null);
 
var w=300,h=300;
 
var outerRadius=(w/2)-10;
var innerRadius=90;
 
 
var color = ['#ececec','#f06b3e','#888888'];
 
var arc=d3.svg.arc()
        .innerRadius(0)
        .outerRadius(outerRadius)
        .startAngle(0)
        .endAngle(2*Math.PI);
 
 
var arcLine=d3.svg.arc()
        .innerRadius(innerRadius)
        .outerRadius(outerRadius-10)
        .startAngle(0);
 
var svg=d3.select("#chart")
        .append("svg")
        .attr({
            width:w,
            height:h,
            class:'shadow'
        }).append('g')
        .attr({
            transform:'translate('+w/2+','+h/2+')'
        });
 
var defs = svg.append("svg:defs");
 
var inset_shadow = defs.append("svg:filter")
        .attr("id", "inset-shadow");
 
inset_shadow.append("svg:feOffset")
        .attr({
            dx:0,
            dy:0
        });
 
inset_shadow.append("svg:feGaussianBlur")
        .attr({
            stdDeviation:4,
            result:'offset-blur'
        });
 
inset_shadow.append("svg:feComposite")
        .attr({
            operator:'out',
            in:'SourceGraphic',
            in2:'offset-blur',
            result:'inverse'
        });
 
inset_shadow.append("svg:feFlood")
        .attr({
            'flood-color':'black',
            'flood-opacity':.7,
            result:'color'
        });
 
inset_shadow.append("svg:feComposite")
        .attr({
            operator:'in',
            in:'color',
            in2:'inverse',
            result:'shadow'
        });
 
inset_shadow.append("svg:feComposite")
        .attr({
            operator:'over',
            in:'shadow',
            in2:'SourceGraphic'
        });
 
var path=svg.append('path')
        .attr({
            d:arc
        })
        .style({
            fill:color[0],
            filter:'url(#inset-shadow)'
        });
 
 
var pathForeground=svg.append('path')
        .datum({endAngle:0})
        .attr({
            d:arcLine,
            transform:'rotate(180)'
        })
        .style({
            fill:color[1],
            filter:'url(#inset-shadow)'
        });
 
 
var middleCount=svg.append('text')
        .datum(0)
        .text(function(d){
            return d;
        })
 
        .attr({
            class:'middleText',
            'text-anchor':'middle',
            dy:25
        })
        .style({
            fill:d3.rgb(color[2]),
            'font-size':'80px',
            filter:'url(#inset-shadow)'
 
 
        });
 
var oldValue=0;
var arcTween=function(transition, newValue,oldValue) {
    transition.attrTween("d", function (d) {
        var interpolate = d3.interpolate(d.endAngle, ((2*Math.PI))*(newValue/100));
 
        var interpolateCount = d3.interpolate(oldValue, newValue);
        return function (t) {
            d.endAngle = interpolate(t);
            middleCount.text(Math.floor(interpolateCount(t))+'%');
            return arcLine(d);
        };
    });
};
 
 
var animate=function(){
 
    pathForeground.transition()
            .duration(750)
            .ease('cubic')
            .call(arcTween,percent,oldValue);
    oldValue=percent;
    percent=(Math.random() * 80) + 20;
    setTimeout(animate,1500);
};
 
setTimeout(animate,0);

