<template>
  <div class="analytics" v-if="this.key">
    <h2 class="title">Аналитика</h2>
    <h3 class="subtitle">Аналитика по визитам</h3>
    <div ref="graf" class="diagram"></div>
  </div>
  <div></div>
  <div class="analytics_error" v-if="!this.key">
    Ошибка!
    <br />
    Попробуйте перезагрузить страницу.
  </div>
</template>

<script>
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Dark from "@amcharts/amcharts5/themes/Dark";
import am5locales_ru_RU from "@amcharts/amcharts5/locales/ru_RU";
export default {
  name: "AnalyticsPage",
  data() {
    return {
      visitsArr: [
          {"date":"2020-07-01","visits":213},
          {"date":"2020-07-02","visits":249},
          {"date":"2020-07-03","visits":179},
          {"date":"2020-07-04","visits":170},
          {"date":"2020-07-05","visits":184},
          {"date":"2020-07-06","visits":202},
          {"date":"2020-07-07","visits":198},
          {"date":"2020-07-08","visits":168},
          {"date":"2020-07-09","visits":176},
          {"date":"2020-07-10","visits":171},
          {"date":"2020-07-11","visits":190},
          {"date":"2020-07-12","visits":154},
          {"date":"2020-07-13","visits":246},
          {"date":"2020-07-14","visits":250},
          {"date":"2020-07-15","visits":227},
          {"date":"2020-07-16","visits":140},
          {"date":"2020-07-17","visits":170},
          {"date":"2020-07-18","visits":125},
          {"date":"2020-07-19","visits":106},
          {"date":"2020-07-20","visits":207},
          {"date":"2020-07-21","visits":222},
          {"date":"2020-07-22","visits":198},
          {"date":"2020-07-23","visits":204},
          {"date":"2020-07-24","visits":213},
          {"date":"2020-07-25","visits":145},
          {"date":"2020-07-26","visits":166},
          {"date":"2020-07-27","visits":163},
          {"date":"2020-07-28","visits":135},
          {"date":"2020-07-29","visits":45}

      ],
    };
  },
  computed: {
    visitData() {
      const visitsDate = this.visitsArr.map((item) => {
        const container = {};
        container.value = item.visits;
        container.date = new Date(
          item.date.split("-").map((item) => parseInt(item))
        ).getTime();
        return container;
      });
      return visitsDate;
    },
    key() {return this.$store.state.key;},
  },
  mounted() {
    let root = am5.Root.new(this.$refs.graf);
    root.setThemes([am5themes_Dark.new(root)]);
    root.locale = am5locales_ru_RU;
    let chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panY: false,
        wheelY: "zoomX",
        layout: root.verticalLayout,
        maxTooltipDistance: 0,
      })
    );
    let data = this.visitData;

    let yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        extraTooltipPrecision: 1,
        renderer: am5xy.AxisRendererY.new(root, {}),
      })
    );

    let xAxis = chart.xAxes.push(
      am5xy.DateAxis.new(root, {
        start: 0.01,
        baseInterval: { timeUnit: "day", count: 1 },
        renderer: am5xy.AxisRendererX.new(root, {}),
      })
    );

    xAxis.get("periodChangeDateFormats")["day"] = "MMMM";

    xAxis.data.setAll(data);

    function createSeries(name, field) {
      var series = chart.series.push(
        am5xy.LineSeries.new(root, {
          name: "Посещаемость",
          xAxis: xAxis,
          yAxis: yAxis,
          valueYField: field,
          valueXField: "date",

          tooltip: am5.Tooltip.new(root, {}),
        })
      );

      series.bullets.push(function () {
        return am5.Bullet.new(root, {
          sprite: am5.Circle.new(root, {
            radius: 3,
            fill: series.get("fill"),
          }),
        });
      });

      series.strokes.template.set("strokeWidth", 2);
      series.set("fill", am5.color("#fff"));
      series.set("stroke", am5.color("#ff4402"));

      series
        .get("tooltip")
        .label.set("text", "[bold]{name}[/]\n{valueX.formatDate()}: {valueY}");
      series.data.setAll(data);
    }

    createSeries("Series", "value");

    chart.set(
      "cursor",
      am5xy.XYCursor.new(root, {
        behavior: "zoomXY",
        xAxis: xAxis,
      })
    );

    xAxis.set(
      "tooltip",
      am5.Tooltip.new(root, {
        themeTags: ["axis"],
      })
    );

    yAxis.set(
      "tooltip",
      am5.Tooltip.new(root, {
        themeTags: ["axis"],
      })
    );
  },

  beforeUnmount() {
    if (this.root) {
      this.root.dispose();
    }
  },
};
</script>

<style scoped>
.analytics {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
}
.title {
  margin-bottom: 10px;
  font-size: 35px;
}
.subtitle {
  margin-bottom: 6px;
}
.diagram {
  width: 80%;
  margin-top: 20px;
  height: 500px;
  background-color: #424242;
}
.analytics_error {
  margin-top: 20px;
  text-align: center;
  font-size: 20px;
}
@media screen and (max-width: 720px) {
  .diagram {
    width: 100%;
  }
}
@media screen and (max-width: 480px) {
  .diagram {
    height: 280px;
  }
}
</style>