import React from 'react';
import {Button} from '@dhis2/ui'

const LoadingIndicator = () => {
  return (
    <div className="d-flex justify-content-center align-items-center"  style={{height: "100vh"}}>
      <Button
    icon={
      <svg
        height="24"
        viewBox="0 0 24 24"
        width="24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="m10.7071068 13.2928932c.3604839.360484.3882135.927715.0831886 1.3200062l-.0831886.0942074-5.2921068 5.2918932 2.585.001c.51283584 0 .93550716.3860402.99327227.8833789l.00672773.1166211c0 .5128358-.38604019.9355072-.88337887.9932723l-.11662113.0067277h-5l-.0193545-.0001861c-.02332655-.0004488-.04664039-.0017089-.06989557-.0037803l.08925007.0039664c-.05062028 0-.10036209-.0037612-.14896122-.0110193-.01698779-.0026088-.03441404-.0056829-.05176454-.0092208-.02202032-.0043997-.04371072-.0095935-.06511385-.0154809-.01562367-.0043767-.03101173-.0090077-.04630291-.0140171-.01965516-.0063844-.03943668-.0135776-.058916-.0213659-.01773713-.0070924-.03503998-.014575-.05216303-.0225694-.02066985-.0097032-.0410724-.0201205-.0610554-.0312024-.01211749-.006623-.02433616-.0137311-.0364318-.0211197-.0255662-.0157232-.05042194-.0324946-.07445055-.050318-.00744374-.0054399-.01468311-.010971-.02186305-.0166142-.0631594-.049624-.12042594-.1068905-.17019169-.1703222l.08010726.0903567c-.03539405-.0353941-.06758027-.0727812-.09655864-.1118002-.01784449-.0241759-.03461588-.0490316-.05026715-.0746464-.00746051-.0120471-.0145686-.0242658-.02139626-.0365981-.01087725-.0197682-.02129453-.0401707-.03101739-.060963-.00797473-.0170006-.01545736-.0343035-.02242829-.0517631-.00790975-.0197568-.015103-.0395383-.02167881-.0595996-.00481796-.0148851-.00944895-.0302731-.01370154-.0457434-.00601151-.0215565-.01120534-.0432469-.01567999-.0651989-.00346298-.0174188-.00653707-.0348451-.00914735-.0523272-.00160026-.010231-.00303174-.021012-.00429007-.0318458l-.00276132-.027371c-.00207143-.0232552-.00333152-.0465691-.00378026-.0698956l-.00018615-.0193545v-5c0-.5522847.44771525-1 1-1 .51283584 0 .93550716.3860402.99327227.8833789l.00672773.1166211v2.584l5.29289322-5.2911068c.39052429-.3905243 1.02368928-.3905243 1.41421358 0zm9.2928932-3.2928932v10h-10v-2h8v-8zm-6-6v2h-8v7h-2v-9zm7-2 .0193545.00018615c.0233265.00044874.0466404.00170883.0698956.00378026l-.0892501-.00396641c.0506203 0 .1003621.00376119.1489612.01101934.0169878.00260874.0344141.00568283.0517646.00922073.0220203.00439973.0437107.00959356.0651138.0154809.0156237.00437676.0310117.00900775.0463029.01401712.0196552.0063844.0394367.01357765.058916.02136587.0177371.00709246.03504.01457509.052163.0225694.0206699.00970328.0410724.02012056.0610555.03120241.0121174.00662306.0243361.01373115.0364318.02111968.0255662.01572325.0504219.03249464.0744505.05031806.0074437.00543993.0146831.01097097.021863.01661418.0631595.04962402.120426.10689056.1701917.17032223l-.0801072-.0903567c.035394.03539405.0675802.0727812.0965586.11180017.0178445.02417592.0346159.04903166.0502672.07464642.0074605.01204708.0145686.02426575.0213962.03659809.0108773.01976815.0212946.0401707.0310174.06096295.0079748.01700065.0154574.0343035.0224283.05176313.0079098.01975682.015103.03953834.0216788.05959961.004818.01488507.009449.03027313.0137016.04574344.0060115.02155649.0112053.04324689.0156799.06519887.003463.01741884.0065371.03484509.0091474.05232723.0016003.01023098.0030317.02101195.0042901.03184574l.0030256.03039033c.0015457.01796531.0026074.03596443.003185.05397618l.0005171.03225462v5c0 .55228475-.4477153 1-1 1-.5128358 0-.9355072-.38604019-.9932723-.88337887l-.0067277-.11662113v-2.586l-5.2928932 5.2931068c-.3905243.3905243-1.0236893.3905243-1.4142136 0-.3604839-.360484-.3882135-.92771504-.0831886-1.32000624l.0831886-.09420734 5.2911068-5.29289322h-2.584c-.5128358 0-.9355072-.38604019-.9932723-.88337887l-.0067277-.11662113c0-.51283584.3860402-.93550716.8833789-.99327227l.1166211-.00672773z"
          fill="#inherit"
        />
      </svg>
    }
    loading
    name="Loading button"
    // onClick={logger}
    primary
    value="default"

    
  >
    Loading...
  </Button>

    </div>
    
  )
}
export default LoadingIndicator;