const formatMessage = recommendations =>
  recommendations.reduce(
    (
      acc,
      {
        date, asset, link, recommendation, entryPrice, stopLoss, target, status,
      },
      index,
    ) => `${acc}

[Recommendation #${index + 1}](${link})
Date: *${date}*
Asset: *${asset}*
Recommendation: *${recommendation}*
Entry Price: *${entryPrice}*
Stop Loss: *${stopLoss}*
Target: *${target}*
Status: *${status}*`,
    `Here are the trade recommendations for this week gathered from
[Hacked.com Hacking Finance](https://hacked.com/recommendations2/)`,
  );
  
module.exports = formatMessage;
